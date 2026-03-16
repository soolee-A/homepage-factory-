import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Octokit } from "@octokit/rest";

admin.initializeApp();

interface ParsedPlan {
  siteName: string;
  niche: string;
  templateType: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  targetAudience: string;
  designStyle: string;
  features: string[];
}

async function parsePlanWithGemini(planText: string): Promise<ParsedPlan> {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `다음 홈페이지 기획서를 분석하고 JSON 형식으로 반환하세요.
반드시 아래 JSON 형식만 반환하고 다른 텍스트는 포함하지 마세요.

기획서:
${planText}

반환 형식:
{
  "siteName": "사이트 이름",
  "niche": "분야/업종",
  "templateType": "calculator|landing|blog|portfolio|shop 중 하나",
  "primaryKeyword": "주요 SEO 키워드",
  "secondaryKeywords": ["키워드1", "키워드2"],
  "targetAudience": "타겟 사용자",
  "designStyle": "modern|minimal|colorful|professional 중 하나",
  "features": ["기능1", "기능2"]
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Gemini가 유효한 JSON을 반환하지 않았습니다");
  return JSON.parse(jsonMatch[0]) as ParsedPlan;
}

export const onProjectCreated = functions
  .runWith({
    timeoutSeconds: 540,
    memory: "1GB",
    secrets: ["ANTHROPIC_API_KEY", "GEMINI_API_KEY", "GITHUB_TOKEN"],
  })
  .firestore
  .document("projects/{projectId}")
  .onCreate(async (snap) => {
    const data = snap.data();
    const planText: string = data.planText || "";

    console.log("[Factory] 기획서 파싱 시작 (Gemini)");
    await snap.ref.update({ status: "parsing" });

    let plan: ParsedPlan;
    try {
      if (planText) {
        plan = await parsePlanWithGemini(planText);
        console.log("[Factory] Gemini 파싱 완료:", plan.siteName);
      } else {
        // planText 없으면 기존 필드 직접 사용
        plan = {
          siteName: data.siteName || "My Site",
          niche: data.niche || "general",
          templateType: data.templateType || "landing",
          primaryKeyword: data.seo?.primaryKeyword || data.niche || "general",
          secondaryKeywords: data.seo?.secondaryKeywords || [],
          targetAudience: data.targetAudience || "일반 사용자",
          designStyle: data.design?.style || "modern",
          features: data.features || [],
        };
      }
    } catch (parseError: any) {
      console.error("[Factory] Gemini 파싱 실패:", parseError.message);
      await snap.ref.update({ status: "error", error: `기획서 파싱 실패: ${parseError.message}` });
      return;
    }

    await snap.ref.update({ status: "generating", parsedPlan: plan });
    console.log("[Factory] HTML 생성 시작 (Claude)");

    try {
      const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 4000,
        messages: [{
          role: "user",
          content: `Create a complete single-file HTML website based on this plan.

Site Name: ${plan.siteName}
Niche: ${plan.niche}
Template Type: ${plan.templateType}
Primary Keyword: ${plan.primaryKeyword}
Secondary Keywords: ${plan.secondaryKeywords.join(", ")}
Target Audience: ${plan.targetAudience}
Design Style: ${plan.designStyle}
Features: ${plan.features.join(", ")}

Requirements:
- Complete single HTML file with embedded CSS and JS
- SEO meta tags (title, description, og tags)
- JSON-LD schema markup
- Google AdSense placeholder comments
- Responsive design (mobile-first)
- Design style: ${plan.designStyle}

Return ONLY the HTML code, nothing else.`
        }]
      });

      const firstContent = message.content[0];
      const html = firstContent?.type === "text" ? firstContent.text : "";
      if (!html) throw new Error("Claude가 빈 HTML을 반환했습니다");

      const fileName = plan.siteName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      const filePath = `sites/${fileName}/index.html`;

      const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
      let sha: string | undefined;
      try {
        const existing = await octokit.repos.getContent({ owner: "soolee-A", repo: "homepage-factory-", path: filePath });
        sha = (existing.data as any).sha;
      } catch {}

      await octokit.repos.createOrUpdateFileContents({
        owner: "soolee-A",
        repo: "homepage-factory-",
        path: filePath,
        message: `[Factory] ${plan.siteName}`,
        content: Buffer.from(html).toString("base64"),
        sha,
      });

      await snap.ref.update({ status: "deployed", filePath, deployedAt: new Date() });
      console.log(`[Factory] ✅ 완료: ${filePath}`);

    } catch (error: any) {
      console.error("[Factory] 오류:", error.message);
      await snap.ref.update({ status: "error", error: error.message });
    }
  });

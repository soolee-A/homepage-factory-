import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import Anthropic from "@anthropic-ai/sdk";
import { Octokit } from "@octokit/rest";

admin.initializeApp();

export const onProjectCreated = functions
  .runWith({ timeoutSeconds: 540, memory: "1GB" })
  .firestore
  .document("projects/{projectId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const siteName = data.siteName || "My Site";
    const niche = data.niche || "general";
    const templateType = data.templateType || "calculator";
    const primaryKeyword = data.seo?.primaryKeyword || niche;

    console.log(`[Factory] Generating: ${siteName}`);
    await snap.ref.update({ status: "generating" });

    try {
      const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        messages: [{
          role: "user",
          content: `Create a complete single-file HTML ${templateType} website.
Site: ${siteName}, Niche: ${niche}, Keyword: ${primaryKeyword}
Include: SEO meta tags, JSON-LD schema, AdSense placeholder comments, responsive design.
Return ONLY the HTML code.`
        }]
      });

      const html = message.content[0].type === "text" ? message.content[0].text : "";
      const fileName = siteName.toLowerCase().replace(/\s+/g, "-");
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
        message: `[Factory] ${siteName}`,
        content: Buffer.from(html).toString("base64"),
        sha,
      });

      await snap.ref.update({ status: "deployed", filePath, deployedAt: new Date() });
      console.log(`[Factory] ✅ Done: ${filePath}`);

    } catch (error: any) {
      console.error("[Factory] Error:", error.message);
      await snap.ref.update({ status: "error", error: error.message });
    }
  });

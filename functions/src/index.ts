/**
 * 🏭 HOMEPAGE FACTORY — Firebase Cloud Functions
 * Firestore onCreate → Claude API → GitHub Commit → Vercel Deploy
 */

import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import Anthropic from "@anthropic-ai/sdk";
import { Octokit } from "@octokit/rest";

admin.initializeApp();

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const GITHUB_OWNER = process.env.GITHUB_OWNER!;
const GITHUB_REPO  = process.env.GITHUB_REPO!;

// ─────────────────────────────────────────────
// 📌 Firestore 스키마 타입
// ─────────────────────────────────────────────
interface ProjectInput {
  siteName:    string;
  niche:       string;
  templateType: "ranking" | "calculator" | "converter" | "quiz" | "checklist";
  seo: {
    primaryKeyword:     string;
    secondaryKeywords:  string[];
    titleTag:           string;
    metaDescription:    string;
    schemaType:         string;
    targetCountry:      string;
  };
  design: {
    colorTheme:   "dark" | "light";
    accentColor:  string;
    fontHeading:  string;
    fontBody:     string;
    layout:       string;
  };
  ads: {
    adsenseId:   string;
    slots: {
      headerBanner: string;
      midContent:   string;
      sidebar:      string;
      sticky:       string;
    };
    autoAds: boolean;
  };
  features: {
    categories:        string[];
    affiliateEnabled:  boolean;
    crawlerSource:     string[];
  };
  deploy: {
    platform:      string;
    domain:        string;
    customDomain:  boolean;
  };
}

// ─────────────────────────────────────────────
// 🚀 메인 트리거: Firestore projects 컬렉션 onCreate
// ─────────────────────────────────────────────
export const onProjectCreated = functions
  .runWith({ timeoutSeconds: 540, memory: "1GB" })
  .firestore
  .document("projects/{projectId}")
  .onCreate(async (snap: functions.firestore.QueryDocumentSnapshot, context: functions.EventContext) => {
    const projectId = context.params.projectId;
    const input = snap.data() as ProjectInput;
    const ref = snap.ref;

    try {
      // 1. 상태 업데이트: generating
      await ref.update({ status: "generating", startedAt: admin.firestore.FieldValue.serverTimestamp() });

      // 2. Claude API로 전체 홈페이지 코드 생성
      console.log(`[Factory] 🧠 Generating code for: ${input.siteName}`);
      const generatedCode = await generateHomepage(input);

      // 3. GitHub에 파일 커밋
      console.log(`[Factory] 📦 Committing to GitHub...`);
      const commitSha = await commitToGitHub(projectId, input, generatedCode);

      // 4. 상태 업데이트: deployed
      await ref.update({
        status: "deployed",
        commitSha,
        deployedAt: admin.firestore.FieldValue.serverTimestamp(),
        previewUrl: `https://${input.deploy.domain}`,
      });

      console.log(`[Factory] ✅ Done! Project ${projectId} is LIVE.`);

    } catch (err: any) {
      console.error("[Factory] ❌ Error:", err.message);
      await ref.update({ status: "error", error: err.message });
    }
  });


// ─────────────────────────────────────────────
// 🧠 Claude API: 홈페이지 코드 생성
// ─────────────────────────────────────────────
async function generateHomepage(input: ProjectInput): Promise<GeneratedFiles> {
  const systemPrompt = buildSystemPrompt();
  const userPrompt   = buildUserPrompt(input);

  const message = await anthropic.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 8192,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const text = message.content
    .filter(b => b.type === "text")
    .map(b => (b as any).text)
    .join("");

  return parseGeneratedCode(text);
}

function buildSystemPrompt(): string {
  return `You are a Full-stack SEO Engineer specialized in building high-revenue AdSense websites.

RULES:
- Output ONLY valid JSON with no markdown, no backticks
- Generate complete, production-ready code
- All code must be SEO-optimized with JSON-LD schema
- Include Google AdSense ad slots with comments marking positions
- Mobile-first responsive design
- Core Web Vitals optimized (LCP < 2.5s, CLS < 0.1)

OUTPUT FORMAT (strict JSON):
{
  "indexHtml": "<full HTML string>",
  "stylesCSS": "<full CSS string>",
  "mainJS": "<full JS string>",
  "sitemapXml": "<sitemap XML string>",
  "robotsTxt": "<robots.txt string>"
}`;
}

function buildUserPrompt(input: ProjectInput): string {
  return `Generate a complete revenue-optimized homepage for:

SITE: ${input.siteName}
NICHE: ${input.niche}
TEMPLATE TYPE: ${input.templateType}

SEO CONFIG:
- Primary Keyword: ${input.seo.primaryKeyword}
- Secondary Keywords: ${input.seo.secondaryKeywords.join(", ")}
- Title Tag: ${input.seo.titleTag}
- Meta Description: ${input.seo.metaDescription}
- Schema Type: ${input.seo.schemaType}
- Target Country: ${input.seo.targetCountry}

DESIGN:
- Theme: ${input.design.colorTheme}
- Accent Color: ${input.design.accentColor}
- Heading Font: ${input.design.fontHeading}
- Body Font: ${input.design.fontBody}
- Layout: ${input.design.layout}

ADS (Google AdSense):
- Publisher ID: ${input.ads.adsenseId}
- Header Banner Slot: ${input.ads.slots.headerBanner}
- Mid Content Slot: ${input.ads.slots.midContent}
- Sidebar Slot: ${input.ads.slots.sidebar}
- Sticky Mobile Slot: ${input.ads.slots.sticky}

FEATURES:
- Categories: ${input.features.categories.join(", ")}
- Affiliate Links: ${input.features.affiliateEnabled}

Generate COMPLETE files. The index.html must include:
1. JSON-LD schema markup
2. Open Graph tags
3. AdSense script + all 4 ad slots
4. Responsive CSS (320px-1440px)
5. Core functionality for ${input.templateType}`;
}

interface GeneratedFiles {
  indexHtml:  string;
  stylesCSS:  string;
  mainJS:     string;
  sitemapXml: string;
  robotsTxt:  string;
}

function parseGeneratedCode(text: string): GeneratedFiles {
  try {
    // JSON 파싱 시도
    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    // 파싱 실패 시 텍스트를 index.html로 처리
    return {
      indexHtml:  text,
      stylesCSS:  "",
      mainJS:     "",
      sitemapXml: generateDefaultSitemap(),
      robotsTxt:  generateDefaultRobots(),
    };
  }
}


// ─────────────────────────────────────────────
// 📦 GitHub: 파일 커밋 (자동 Vercel 배포 트리거)
// ─────────────────────────────────────────────
async function commitToGitHub(
  projectId: string,
  input: ProjectInput,
  files: GeneratedFiles
): Promise<string> {
  const branch = "main";
  const basePath = `sites/${input.deploy.domain}`;

  // 현재 브랜치의 최신 SHA 조회
  const { data: refData } = await octokit.git.getRef({
    owner: GITHUB_OWNER,
    repo:  GITHUB_REPO,
    ref:   `heads/${branch}`,
  });
  const latestCommitSha = refData.object.sha;

  // 현재 tree 조회
  const { data: commitData } = await octokit.git.getCommit({
    owner:      GITHUB_OWNER,
    repo:       GITHUB_REPO,
    commit_sha: latestCommitSha,
  });
  const baseTreeSha = commitData.tree.sha;

  // 생성할 파일 목록
  const fileMap: Record<string, string> = {
    [`${basePath}/index.html`]:    files.indexHtml,
    [`${basePath}/styles.css`]:    files.stylesCSS,
    [`${basePath}/main.js`]:       files.mainJS,
    [`${basePath}/sitemap.xml`]:   files.sitemapXml,
    [`${basePath}/robots.txt`]:    files.robotsTxt,
    [`${basePath}/vercel.json`]:   generateVercelConfig(input),
    [`${basePath}/package.json`]:  generatePackageJson(input),
  };

  // 각 파일을 Blob으로 생성
  const treeItems = await Promise.all(
    Object.entries(fileMap)
      .filter(([, content]) => content)
      .map(async ([path, content]) => {
        const { data: blob } = await octokit.git.createBlob({
          owner:    GITHUB_OWNER,
          repo:     GITHUB_REPO,
          content:  Buffer.from(content).toString("base64"),
          encoding: "base64",
        });
        return { path, mode: "100644" as const, type: "blob" as const, sha: blob.sha };
      })
  );

  // 새 tree 생성
  const { data: newTree } = await octokit.git.createTree({
    owner:     GITHUB_OWNER,
    repo:      GITHUB_REPO,
    base_tree: baseTreeSha,
    tree:      treeItems,
  });

  // 커밋 생성
  const { data: newCommit } = await octokit.git.createCommit({
    owner:   GITHUB_OWNER,
    repo:    GITHUB_REPO,
    message: `🏭 [Factory] Auto-generate: ${input.siteName} (${projectId})`,
    tree:    newTree.sha,
    parents: [latestCommitSha],
  });

  // 브랜치 업데이트 → Vercel 자동 배포 트리거
  await octokit.git.updateRef({
    owner: GITHUB_OWNER,
    repo:  GITHUB_REPO,
    ref:   `heads/${branch}`,
    sha:   newCommit.sha,
  });

  return newCommit.sha;
}


// ─────────────────────────────────────────────
// 🛠 헬퍼: 설정 파일 생성
// ─────────────────────────────────────────────
function generateVercelConfig(input: ProjectInput): string {
  return JSON.stringify({
    version: 2,
    name: input.siteName.toLowerCase().replace(/\s+/g, "-"),
    builds: [{ src: "**/*", use: "@vercel/static" }],
    routes: [
      { src: "/(.*)", dest: "/$1" },
      { handle: "filesystem" },
      { src: "/(.*)", dest: "/index.html" },
    ],
    headers: [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" },
        ],
      },
      {
        source: "/styles.css",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ],
  }, null, 2);
}

function generatePackageJson(input: ProjectInput): string {
  return JSON.stringify({
    name: input.siteName.toLowerCase().replace(/\s+/g, "-"),
    version: "1.0.0",
    private: true,
    scripts: { dev: "npx serve .", build: "echo Static site, no build needed" },
  }, null, 2);
}

function generateDefaultSitemap(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://DOMAIN_PLACEHOLDER/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
}

function generateDefaultRobots(): string {
  return `User-agent: *\nAllow: /\nSitemap: https://DOMAIN_PLACEHOLDER/sitemap.xml`;
}

import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import Anthropic from "@anthropic-ai/sdk";
import { Octokit } from "@octokit/rest";

admin.initializeApp();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const onProjectCreated = functions.firestore
  .document("projects/{projectId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const siteName = data.siteName || "My Site";
    const niche = data.niche || "general";
    const templateType = data.templateType || "calculator";
    const primaryKeyword = data.seo?.primaryKeyword || niche;

    console.log(`[Factory] Generating code for: ${siteName}`);

    try {
      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        messages: [{
          role: "user",
          content: `Create a single HTML file for a ${templateType} website about ${niche}. 
Site name: ${siteName}
Primary keyword: ${primaryKeyword}
Include: SEO meta tags, AdSense placeholder comments, responsive design, and actual calculator functionality.
Return ONLY the HTML code, no explanation.`
        }]
      });

      const htmlContent = message.content[0].type === "text" ? message.content[0].text : "";
      
      const githubToken = process.env.GITHUB_TOKEN;
      const octokit = new Octokit({ auth: githubToken });
      
      const fileName = siteName.toLowerCase().replace(/\s+/g, "-");
      const filePath = `sites/${fileName}/index.html`;
      
      await octokit.repos.createOrUpdateFileContents({
        owner: "soolee-A",
        repo: "homepage-factory-",
        path: filePath,
        message: `[Factory] Generate ${siteName}`,
        content: Buffer.from(htmlContent).toString("base64"),
      });

      await snap.ref.update({ status: "deployed", deployedAt: new Date() });
      console.log(`[Factory] ✅ Done: ${filePath}`);

    } catch (error) {
      console.error("[Factory] Error:", error);
      await snap.ref.update({ status: "error" });
    }
  });

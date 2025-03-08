import fs from "fs";
import path from "path";

export function addCssToNuxtConfig(projectPath, cssPath) {
  const nuxtConfigPath = path.join(projectPath, "nuxt.config.ts");

  if (!fs.existsSync(nuxtConfigPath)) {
    console.error("❌ Error: `nuxt.config.ts` not found.");
    return false;
  }

  let configContent = fs.readFileSync(nuxtConfigPath, "utf8");

  // Check if the `css` property already exists
  if (!configContent.includes("css: [")) {
    // If `css` doesn't exist, add the property
    configContent = configContent.replace(
      "export default defineNuxtConfig({",
      `export default defineNuxtConfig({
  css: ["${cssPath}"],`
    );
  } else {
    // If `css` exists, add the file to the list
    const cssRegex = /css:\s*\[(.*?)\]/s;
    configContent = configContent.replace(cssRegex, (match, group) => {
      return `css: [${group ? group.trim() + ", " : ""}"${cssPath}"]`;
    });
  }

  fs.writeFileSync(nuxtConfigPath, configContent, "utf8");
  console.log(`✅ CSS file added to nuxt.config.ts: ${cssPath}`);
  return true;
}
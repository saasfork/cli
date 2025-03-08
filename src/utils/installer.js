import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export function createNuxtProject(projectName) {
  console.log(`Creating project "${projectName}"...`);
  const cmd = `npx nuxi init ${projectName} --packageManager npm --no-install --gitInit no --force --template v3`;
  console.log(`Executing command: ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
  console.log(`\nProject "${projectName}" created successfully!`);
  process.chdir(projectName);
}

export function installDependencies() {
  console.log("\nInstalling dependencies...");
  execSync("npm install", { stdio: 'inherit' });
}

export function installTailwind() {
  console.log("\nInstalling Tailwind CSS...");
  execSync("npx nuxi@latest module add tailwindcss", { stdio: 'inherit' });
  console.log("\nTailwind CSS has been installed and configured successfully!");
}

export function installSass() {
  console.log("\nInstalling Sass...");
  execSync("npm install -D sass", { stdio: 'inherit' });
  console.log("\nSass has been installed successfully!");
}

export function setupGlobalCss(projectPath) {
  console.log("\nSetting up global CSS file...");
  
  // Create assets directory if it doesn't exist
  const assetsDir = path.join(projectPath, "assets");
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir);
  }
  
  // Create empty global.scss file
  const globalCssPath = path.join(assetsDir, "styles.scss");
  fs.writeFileSync(globalCssPath, "// Your global styles here\n", "utf8");
  
  return "~/assets/styles.scss";
}
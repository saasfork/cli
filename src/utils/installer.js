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

export function installModule(module) {
  console.log(`\nInstalling ${module.message}...`);
  execSync(module.installCommand, { stdio: 'inherit' });
  console.log(`\n${module.message} has been installed successfully!`);
}

export function installModulesFromConfig(config) {
  // Install Nuxt modules
  if (config.modules && config.modules.length > 0) {
    for (const module of config.modules) {
      installModule(module);
    }
  }
  
  // Install dev dependencies
  if (config.devDependencies && config.devDependencies.length > 0) {
    for (const dependency of config.devDependencies) {
      installModule(dependency);
    }
  }
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

// Fonction plus générique pour implémenter les fonctionnalités selon la configuration
export function setupFeatures(projectPath, config) {
  let cssPath = null;
  
  // Configurer le CSS global si activé
  if (config.features.globalCss && config.features.globalCss.enabled) {
    cssPath = setupGlobalCss(projectPath);
  }
  
  return {
    cssPath
  };
}
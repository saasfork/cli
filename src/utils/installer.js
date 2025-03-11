import { fileURLToPath } from 'url';
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { setupI18nFiles, generateI18nConfig } from './i18nSetup.js';
import { handleError } from './error-handler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Crée un nouveau projet Nuxt
 * @param {string} projectName - Nom du projet à créer
 */
export function createNuxtProject(projectName) {
  try {
    console.log(`Creating project "${projectName}"...`);
    const cmd = `npx nuxi init ${projectName} --packageManager npm --no-install --gitInit no --force --template v3`;
    console.log(`Executing command: ${cmd}`);
    execSync(cmd, { stdio: 'inherit' });
    console.log(`\nProject "${projectName}" created successfully!`);
    process.chdir(projectName);
  } catch (error) {
    handleError(error, 'creating Nuxt project');
  }
}

/**
 * Installe les dépendances du projet
 */
export function installDependencies() {
  try {
    console.log("\nInstalling dependencies...");
    execSync("npm install", { stdio: 'inherit' });
  } catch (error) {
    handleError(error, 'installing dependencies');
  }
}

/**
 * Installe un module spécifique
 * @param {Object} module - Informations sur le module à installer
 * @param {string} module.message - Message à afficher
 * @param {string} module.installCommand - Commande d'installation
 */
export function installModule(module) {
  try {
    console.log(`\nInstalling ${module.message}...`);
    execSync(module.installCommand, { stdio: 'inherit' });
    console.log(`\n${module.message} has been installed successfully!`);
  } catch (error) {
    handleError(error, `installing ${module.message}`);
  }
}

/**
 * Installe les modules depuis la configuration
 * @param {Object} config - Configuration contenant les modules à installer
 */
export function installModulesFromConfig(config) {
  try {
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
  } catch (error) {
    handleError(error, 'installing modules from config');
  }
}

/**
 * Configure le fichier CSS global
 * @param {string} projectPath - Chemin du projet
 * @returns {string} - Chemin du fichier CSS créé
 */
export function setupGlobalCss(projectPath) {
  try {
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
  } catch (error) {
    handleError(error, 'setting up global CSS');
    return null;
  }
}

/**
 * Copie les fichiers Docker dans le projet
 * @param {string} projectPath - Chemin du projet
 */
export function copyDockerFiles(projectPath) {
  try {
    const templatePath = path.resolve(__dirname, '../templates');
    const filesToCopy = ['Dockerfile', '.dockerignore'];

    filesToCopy.forEach(file => {
      const src = path.join(templatePath, file);
      const dest = path.join(projectPath, file);

      fs.copyFileSync(src, dest);
      console.log(`✅ ${file} ajouté au projet.`);
    });
  } catch (error) {
    handleError(error, 'copying Docker files');
  }
}

/**
 * Configure les fonctionnalités selon la configuration
 * @param {string} projectPath - Chemin du projet
 * @param {Object} config - Configuration des fonctionnalités
 * @returns {Object} - Informations sur les fonctionnalités configurées
 */
export function setupFeatures(projectPath, config) {
  try {
    let cssPath = null;
    let i18nConfig = null;
    
    // Configurer le CSS global si activé
    if (config.features.globalCss && config.features.globalCss.enabled) {
      cssPath = setupGlobalCss(projectPath);
    }

    if (config.features.i18n && config.features.i18n.enabled) {
      setupI18nFiles(projectPath);
      i18nConfig = generateI18nConfig();
    }
    
    return {
      cssPath,
      i18nConfig
    };
  } catch (error) {
    handleError(error, 'setting up features');
    return { cssPath: null, i18nConfig: null };
  }
}
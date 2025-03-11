import fs from 'fs';
import path from 'path';
import config from '../config.js';
import { handleError } from './error-handler.js';

/**
 * Configure les fichiers i18n dans le projet
 * @param {string} projectPath - Chemin du projet
 */
export function setupI18nFiles(projectPath) {
  try {
    console.log("\nConfigurant les fichiers de traduction i18n...");
    
    // Créer le répertoire i18n s'il n'existe pas
    const localesDir = path.join(projectPath, 'i18n');
    if (!fs.existsSync(localesDir)) {
      fs.mkdirSync(localesDir, { recursive: true });
      console.log(`✅ Répertoire i18n créé.`);
    }
    
    // Créer les fichiers de traduction
    if (config.features.i18n.files) {
      Object.entries(config.features.i18n.files).forEach(([filePath, content]) => {
        const fullPath = path.join(localesDir, filePath);
        const fileDir = path.dirname(fullPath);
        
        // S'assurer que le répertoire parent existe
        if (!fs.existsSync(fileDir)) {
          fs.mkdirSync(fileDir, { recursive: true });
        }
        
        // Écrire le contenu du fichier
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`✅ Fichier de traduction ${filePath} créé dans le répertoire i18n.`);
      });
    }
    
    console.log("✅ Configuration i18n complétée.");
  } catch (error) {
    handleError(error, 'setting up i18n files');
  }
}

/**
 * Génère la configuration i18n pour le fichier nuxt.config.js
 * @returns {string} - Configuration à insérer dans nuxt.config.js
 */
export function generateI18nConfig() {
  try {
    if (!config.features.i18n.enabled) {
      return '';
    }

    const i18nConfig = config.features.i18n.config;
    return `
  i18n: {
    locales: ${JSON.stringify(i18nConfig.locales, null, 4)},
    lazy: ${i18nConfig.lazy},
    defaultLocale: '${i18nConfig.defaultLocale}'
  }`;
  } catch (error) {
    handleError(error, 'generating i18n config');
    return '';
  }
}

/**
 * Ajoute la configuration i18n au fichier nuxt.config.ts existant
 * @param {string} projectPath - Chemin vers le projet
 * @returns {boolean} - Indique si la mise à jour a réussi
 */
export function updateNuxtConfigWithI18n(projectPath) {
  try {
    if (!config.features.i18n.enabled) {
      return false;
    }

    const nuxtConfigPath = path.join(projectPath, 'nuxt.config.ts');
    
    if (!fs.existsSync(nuxtConfigPath)) {
      throw new Error('`nuxt.config.ts` not found.');
    }

    let configContent = fs.readFileSync(nuxtConfigPath, 'utf8');
    
    // Vérifier si la configuration i18n existe déjà
    if (configContent.includes('i18n:')) {
      console.log('✅ La configuration i18n existe déjà dans nuxt.config.ts');
      return true;
    }
    
    // Préparer la configuration i18n
    const i18nConfigString = generateI18nConfig();
    
    // Insérer la configuration à la bonne place
    configContent = configContent.replace(
      /export default defineNuxtConfig\(\s*\{/,
      `export default defineNuxtConfig({\n${i18nConfigString},`
    );
    
    // Écrire le fichier mis à jour
    fs.writeFileSync(nuxtConfigPath, configContent, 'utf8');
    console.log('✅ Configuration i18n ajoutée au fichier nuxt.config.ts');
    return true;
  } catch (error) {
    handleError(error, 'updating Nuxt config with i18n');
    return false;
  }
}

// Export individuel des fonctions au lieu d'un objet par défaut
export default {
  setupI18nFiles,
  generateI18nConfig,
  updateNuxtConfigWithI18n
};

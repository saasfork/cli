import fs from 'fs';
import path from 'path';
import config from '../config.js';

/**
 * Crée les fichiers de localisation nécessaires pour i18n
 * @param {string} projectPath - Chemin vers le projet
 */
export const setupI18nFiles = (projectPath) => {
  if (!config.features.i18n.enabled) {
    return;
  }

  // Création du répertoire locales s'il n'existe pas
  const localesDir = path.join(projectPath, 'locales');
  if (!fs.existsSync(localesDir)) {
    fs.mkdirSync(localesDir, { recursive: true });
  }

  // Création des fichiers de localisation
  Object.entries(config.features.i18n.files).forEach(([filePath, content]) => {
    const fullPath = path.join(projectPath, filePath);
    const dirPath = path.dirname(fullPath);
    
    // S'assurer que le répertoire parent existe
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // Écrire le fichier
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`Fichier de localisation créé: ${filePath}`);
  });

  console.log('Configuration i18n initialisée avec succès!');
};

/**
 * Génère la configuration i18n pour le fichier nuxt.config.js
 * @returns {string} - Configuration à insérer dans nuxt.config.js
 */
export const generateI18nConfig = () => {
  if (!config.features.i18n.enabled) {
    return '';
  }

  const i18nConfig = config.features.i18n.config;
  return `
  i18n: {
    locales: ${JSON.stringify(i18nConfig.locales, null, 4)},
    lazy: ${i18nConfig.lazy},
    defaultLocale: '${i18nConfig.defaultLocale}',
    langDir: '${i18nConfig.langDir}'
  }`;
};

/**
 * Ajoute la configuration i18n au fichier nuxt.config.ts existant
 * @param {string} projectPath - Chemin vers le projet
 * @returns {boolean} - Indique si la mise à jour a réussi
 */
export const updateNuxtConfigWithI18n = (projectPath) => {
  if (!config.features.i18n.enabled) {
    return false;
  }

  const nuxtConfigPath = path.join(projectPath, 'nuxt.config.ts');
  
  if (!fs.existsSync(nuxtConfigPath)) {
    console.error(`❌ Error: \`nuxt.config.ts\` not found.`);
    return false;
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
};

export default {
  setupI18nFiles,
  generateI18nConfig,
  updateNuxtConfigWithI18n
};

import fs from 'fs';
import path from 'path';
import { handleError } from './error-handler.js';

/**
 * Ajoute le CSS global au fichier nuxt.config.ts
 * @param {string} projectPath - Chemin du projet
 * @param {string} cssPath - Chemin du fichier CSS à ajouter
 * @returns {boolean} - Indique si l'ajout a réussi
 */
export function addCssToNuxtConfig(projectPath, cssPath) {
  const nuxtConfigPath = path.join(projectPath, 'nuxt.config.ts');
  
  try {
    if (!fs.existsSync(nuxtConfigPath)) {
      throw new Error('`nuxt.config.ts` not found.');
    }

    let configContent = fs.readFileSync(nuxtConfigPath, 'utf8');
    
    // Vérifier si le fichier CSS est déjà dans la configuration
    if (configContent.includes(cssPath)) {
      console.log('✅ Global CSS is already configured in nuxt.config.ts');
      return true;
    }
    
    // Si une section CSS existe déjà
    if (configContent.includes('css: [')) {
      configContent = configContent.replace(
        /css: \[/,
        `css: [\n    '${cssPath}',`
      );
    } else {
      // Sinon, ajouter une nouvelle section CSS
      configContent = configContent.replace(
        /export default defineNuxtConfig\(\s*\{/,
        `export default defineNuxtConfig({\n  css: ['${cssPath}'],`
      );
    }
    
    fs.writeFileSync(nuxtConfigPath, configContent, 'utf8');
    console.log('✅ Global CSS added to nuxt.config.ts');
    return true;
  } catch (error) {
    handleError(error, 'adding CSS to Nuxt config');
    return false;
  }
}

/**
 * Ajoute la configuration i18n au fichier nuxt.config.ts
 * @param {string} projectPath - Chemin du projet
 * @param {string} i18nConfig - Configuration i18n sous forme de chaîne
 * @returns {boolean} - Indique si l'ajout a réussi
 */
export function addI18nToNuxtConfig(projectPath, i18nConfig) {
  const nuxtConfigPath = path.join(projectPath, 'nuxt.config.ts');
  
  try {
    if (!fs.existsSync(nuxtConfigPath)) {
      throw new Error('`nuxt.config.ts` not found.');
    }

    let configContent = fs.readFileSync(nuxtConfigPath, 'utf8');
    
    // Vérifier si la configuration i18n existe déjà
    if (configContent.includes('i18n:')) {
      console.log('✅ i18n is already configured in nuxt.config.ts');
      return true;
    }
    
    // Ajouter la configuration i18n
    configContent = configContent.replace(
      /export default defineNuxtConfig\(\s*\{/,
      `export default defineNuxtConfig({\n${i18nConfig},`
    );
    
    fs.writeFileSync(nuxtConfigPath, configContent, 'utf8');
    console.log('✅ i18n configuration added to nuxt.config.ts');
    return true;
  } catch (error) {
    handleError(error, 'adding i18n to Nuxt config');
    return false;
  }
}
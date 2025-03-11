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

/**
 * Ajoute la configuration i18n au fichier nuxt.config.ts
 * @param {string} projectPath - Chemin vers le projet
 * @param {object} i18nConfig - Configuration i18n à ajouter
 * @returns {boolean} - Succès de l'opération
 */
export function addI18nToNuxtConfig(projectPath, i18nConfig) {
  const nuxtConfigPath = path.join(projectPath, "nuxt.config.ts");

  if (!fs.existsSync(nuxtConfigPath)) {
    console.error("❌ Error: `nuxt.config.ts` not found.");
    return false;
  }

  let configContent = fs.readFileSync(nuxtConfigPath, "utf8");

  // Vérifier si la configuration i18n existe déjà
  if (configContent.includes("i18n:")) {
    console.log("✅ La configuration i18n existe déjà dans nuxt.config.ts");
    return true;
  }

  // Formater la configuration i18n
  const i18nConfigString = `
  i18n: {
    locales: ${JSON.stringify(i18nConfig.locales, null, 4)},
    lazy: ${i18nConfig.lazy},
    defaultLocale: '${i18nConfig.defaultLocale}',
    langDir: '${i18nConfig.langDir}'
  }`;

  // Insérer la configuration après l'ouverture de l'objet defineNuxtConfig
  configContent = configContent.replace(
    /export default defineNuxtConfig\(\s*\{/,
    `export default defineNuxtConfig({\n${i18nConfigString},`
  );

  fs.writeFileSync(nuxtConfigPath, configContent, "utf8");
  console.log("✅ Configuration i18n ajoutée à nuxt.config.ts");
  return true;
}
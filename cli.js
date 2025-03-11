#!/usr/bin/env node

import { defineCommand, runMain } from "citty";
import { copyDockerFiles, createNuxtProject, installDependencies, installModulesFromConfig, setupFeatures } from "./src/utils/installer.js";
import { addCssToNuxtConfig, addI18nToNuxtConfig } from "./src/utils/nuxt-config.js";
import { handleError } from "./src/utils/error-handler.js";
import config from "./src/config.js";

const main = defineCommand({
  name: "create",
  description: "Create a new SaaS Fork project",
  args: {
    name: {
      type: "positional",
      description: "Project name",
      required: true,
    },
  },
  run({ args }) {
    try {
      // Step 1: Create the Nuxt project
      createNuxtProject(args.name);
      
      // Step 2: Install base dependencies
      installDependencies();
      
      // Step 3: Install modules and dependencies from config
      installModulesFromConfig(config);
      
      // Step 4: Setup features based on config
      const projectPath = process.cwd();
      const { cssPath, i18nConfig } = setupFeatures(projectPath, config);
      
      // Step 5: Configure Nuxt to use the CSS file if available
      if (cssPath) {
        addCssToNuxtConfig(projectPath, cssPath);
      }

      // Step 6: Configure Nuxt to use i18n if available
      if (i18nConfig) {
        addI18nToNuxtConfig(projectPath, i18nConfig);
      }

      // Step 7: Copier les fichiers Docker
      copyDockerFiles(projectPath);

      console.log("\n✅ Project setup completed successfully!");
    } catch (error) {
      handleError(error, 'project creation', true);
    }
  },
});

runMain(main);
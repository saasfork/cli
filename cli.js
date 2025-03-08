#!/usr/bin/env node

import { defineCommand, runMain } from "citty";
import { createNuxtProject, installDependencies, installTailwind, installSass, setupGlobalCss } from "./src/utils/installer.js";
import { addCssToNuxtConfig } from "./src/utils/nuxt-config.js";

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
      
      // Step 3: Install and configure Tailwind CSS
      installTailwind();
      
      // Step 4: Install Sass
      installSass();
      
      // Step 5: Setup global CSS
      const projectPath = process.cwd();
      const cssPath = setupGlobalCss(projectPath);
      
      // Step 6: Configure Nuxt to use the CSS file
      addCssToNuxtConfig(projectPath, cssPath);
      
      console.log("\n✅ Project setup completed successfully!");
    } catch (error) {
      console.error('\n❌ Error while creating the project:', error.message);
      process.exit(1);
    }
  },
});

runMain(main);

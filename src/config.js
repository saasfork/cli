export default {
  nuxtTemplate: "v3",
  packageManager: "npm",
  defaultCssPath: "~/assets/styles.scss",
  modules: [
    {
      name: "tailwindcss",
      installCommand: "npx nuxi@latest module add tailwindcss",
      message: "Tailwind CSS"
    },
    {
      name: "icon", 
      installCommand: "npx nuxi module add icon",
      message: "Nuxt Icon"
    },
    {
      name: 'Nuxt Vee Validate',
      installCommand: 'npx nuxi module add @vee-validate/nuxt',
      message: 'Nuxt Vee Validate'
    },
    {
      name: "Nuxt I18n",
      installCommand: "npx nuxi@latest module add i18n",
      message: "Nuxt I18n"
    },
    {
      name: "SaasFork UI",
      installCommand: "npx nuxi module add @saasfork/ui",
      message: "SaasFork UI"
    }
  ],
  devDependencies: [
    {
      name: "sass",
      installCommand: "npm install -D sass",
      message: "Sass"
    }
  ],
  features: {
    globalCss: {
      enabled: true,
      path: "~/assets/styles.scss"
    },
    i18n: {
      enabled: false,
      config: {
        locales: [
          { code: 'en', file: 'en-US.json' },
          { code: 'fr', file: 'fr-FR.json' }
        ],
        lazy: true,
        defaultLocale: 'en',
        langDir: 'locales/'
      },
      files: {
        "locales/en-US.json": JSON.stringify({
          "welcome": "Welcome",
          "hello": "Hello"
        }, null, 2),
        "locales/fr-FR.json": JSON.stringify({
          "welcome": "Bienvenue",
          "hello": "Bonjour"
        }, null, 2)
      }
    }
  }
};
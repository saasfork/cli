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
    }
  }
};
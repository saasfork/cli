# SaasFork CLI

SaasFork CLI est un outil en ligne de commande facilitant le développement et la gestion de vos projets SaaS.

## Utilisation

### Avec npx (recommandé)

```bash
npx @saasfork/cli [commande] [options]
```

### Installation (optionnel)

Si vous préférez installer le CLI globalement :

```bash
# Installation globale
npm install -g @saasfork/cli

# Ou avec yarn
yarn global add @saasfork/cli

# Puis utilisez
saasfork [commande] [options]
```

## Commandes disponibles

### Commande d'aide

```bash
npx @saasfork/cli --help
```

### Création d'un nouveau projet

```bash
npx @saasfork/cli <nom-du-projet>
```

#### Options

| Option | Description |
|--------|-------------|
| `<nom-du-projet>` | Nom du projet à créer (requis) |

### Fonctionnalités incluses

- Configuration Nuxt.js avec les bonnes pratiques
- Installation de modules essentiels (TailwindCSS, i18n, etc.)
- Configuration Docker pour le déploiement
- Support multi-langue avec i18n
- Structure de projet standardisée

## Développement

Pour contribuer au développement du CLI :

```bash
# Cloner le dépôt
git clone [url-du-depot]

# Installer les dépendances
npm install

# Lier le package pour le développement
npm link
```

## Publication

Pour publier une nouvelle version du CLI :

```bash
# Via le script npm
npm run release

# Ou manuellement
npm version patch
npm login
npm publish --access public
```

## Licence

ISC

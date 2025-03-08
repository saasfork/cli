# SaasFork CLI

SaasFork CLI est un outil en ligne de commande pour faciliter le développement et la gestion de vos projets SaaS.

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

# Puis utilisation
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

### Autres commandes

D'autres commandes seront ajoutées au fur et à mesure du développement de l'outil.

## Développement

Pour contribuer au développement du CLI:

```bash
# Cloner le dépôt
git clone [url-du-repo]

# Installer les dépendances
npm install

# Lier le package en développement
npm link
```

## Licence

ISC

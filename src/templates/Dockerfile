# ------------------------------------------
# Étape 1: Construction de l'application
# ------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app

# Activer corepack pour la gestion des gestionnaires de paquets
RUN corepack enable

# Copier les fichiers de dépendances
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# Installer les dépendances
RUN npm ci

# Copier le reste du projet
COPY . .

# Construction de l'application
RUN npm run build

# ------------------------------------------
# Étape 2: Image de production
# ------------------------------------------
FROM node:22-alpine
WORKDIR /app

# Copier seulement le dossier .output depuis l'étape de construction
COPY --from=build /app/.output ./

# Configuration des variables d'environnement
ENV HOST=0.0.0.0
ENV PORT=80

# Exposer le port
EXPOSE 80

# Commande de démarrage
CMD ["node", "/app/server/index.mjs"]
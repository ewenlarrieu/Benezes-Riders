# Utiliser l'image Node.js officielle
FROM node:20-alpine

# Créer le répertoire de l'application
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier tout le code source
COPY . .

# Exposer le port de l'application
EXPOSE 5000

# Variable d'environnement pour la production
ENV NODE_ENV=production

# Démarrer l'application
CMD ["node", "index.js"]

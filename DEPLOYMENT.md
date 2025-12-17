# Guide de Déploiement - Benezes Riders

## 📋 Prérequis

- Compte GitHub
- Compte Render (gratuit)
- Compte Vercel (gratuit)
- Base de données MongoDB (MongoDB Atlas gratuit)

## 🚀 Étape 1 : Déployer le Backend sur Render

1. **Créer un compte sur [Render](https://render.com)**

2. **Créer une base MongoDB sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**

   - Créer un cluster gratuit
   - Configurer un utilisateur de base de données
   - Whitelist toutes les IP (0.0.0.0/0) pour Render
   - Copier la connection string

3. **Sur Render, créer un nouveau Web Service**

   - Connecter votre dépôt GitHub
   - Configuration :
     - **Name** : benezes-riders-api (ou votre choix)
     - **Environment** : Node
     - **Build Command** : `cd back-end && npm install`
     - **Start Command** : `cd back-end && npm start`
     - **Root Directory** : laisser vide

4. **Ajouter les variables d'environnement sur Render** :

   ```
   PORT=5000
   MONGO_URL=<votre_connection_string_mongodb>
   JWT_SECRET=<générer_une_clé_secrète_aléatoire>
   CLOUDINARY_CLOUD_NAME=<votre_cloudinary_cloud_name>
   CLOUDINARY_API_KEY=<votre_cloudinary_api_key>
   CLOUDINARY_API_SECRET=<votre_cloudinary_api_secret>
   ```

5. **Déployer** - Render va automatiquement déployer votre backend
   - Copier l'URL du backend (ex: `https://benezes-riders-api.onrender.com`)

## 🌐 Étape 2 : Déployer le Frontend sur Vercel

1. **Créer un compte sur [Vercel](https://vercel.com)**

2. **Importer votre projet GitHub**

   - Cliquer sur "Add New Project"
   - Sélectionner votre dépôt GitHub

3. **Configuration du projet** :

   - **Framework Preset** : Vite
   - **Root Directory** : `client`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`

4. **Ajouter la variable d'environnement** :

   ```
   VITE_API_URL=https://votre-backend-render.onrender.com/api
   ```

   ⚠️ Remplacer par l'URL de votre backend Render (sans le slash final)

5. **Déployer** - Vercel va automatiquement builder et déployer

## ⚙️ Configuration CORS Backend

Assurez-vous que votre backend autorise les requêtes du frontend Vercel :

Dans `back-end/index.js`, le CORS est déjà configuré avec `cors()` qui accepte toutes les origines.
Pour plus de sécurité en production, vous pouvez spécifier :

```javascript
app.use(
  cors({
    origin: ["https://votre-site-vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);
```

## 🔄 Déploiement Automatique

- **Frontend** : Vercel redéploie automatiquement à chaque push sur `master`
- **Backend** : Render redéploie automatiquement à chaque push sur `master`

## 🛠️ Commandes Utiles

### Tester le build en local (Frontend)

```bash
cd client
npm run build
npm run preview
```

### Tester le backend en local

```bash
cd back-end
npm start
```

## ⚠️ Notes Importantes

1. **Render gratuit** : Le service s'endort après 15 min d'inactivité. Le premier chargement peut prendre 30-60 secondes.

2. **MongoDB Atlas** : Le tier gratuit offre 512 MB de stockage

3. **Cloudinary** : Nécessaire pour le stockage des images (gratuit jusqu'à 25 crédits/mois)

4. **Variables d'environnement** : Ne jamais commiter les fichiers `.env` sur GitHub

## 📞 URL de Production

Une fois déployé, vous aurez :

- **Frontend** : `https://votre-projet.vercel.app`
- **Backend** : `https://votre-backend.onrender.com`

## 🐛 Dépannage

- **Erreur CORS** : Vérifier que VITE_API_URL est correctement configuré
- **Backend ne répond pas** : Attendre 30-60 secondes (Render gratuit se réveille)
- **Images ne s'affichent pas** : Vérifier la configuration Cloudinary
- **Erreur de build** : Vérifier les logs sur Vercel/Render

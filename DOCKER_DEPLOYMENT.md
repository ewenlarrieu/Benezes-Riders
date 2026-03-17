# Guide de déploiement Docker

## 📋 Prérequis

- Docker et Docker Compose installés
- Compte Gmail avec mot de passe d'application
- Variables d'environnement configurées

## 🔑 Configuration Gmail

1. **Activer l'authentification à 2 facteurs** sur votre compte Gmail
2. **Créer un mot de passe d'application** :
   - Allez sur https://myaccount.google.com/apppasswords
   - Sélectionnez "Mail" et votre appareil
   - Copiez le mot de passe généré (16 caractères)

3. **Mettre à jour le fichier `.env`** dans `back-end/` :
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=votre-email@gmail.com
   EMAIL_PASSWORD=votre-mot-de-passe-application
   EMAIL_RECIPIENT=email-qui-recoit-les-contacts@gmail.com
   ```

## 🐳 Déploiement local avec Docker

### Option 1 : Backend seul

```bash
cd back-end
docker build -t benezes-riders-backend .
docker run -p 5000:5000 --env-file .env benezes-riders-backend
```

### Option 2 : Avec Docker Compose (recommandé)

```bash
# À la racine du projet
docker-compose up -d
```

Pour voir les logs :

```bash
docker-compose logs -f backend
```

Pour arrêter :

```bash
docker-compose down
```

## ☁️ Déploiement sur un service Docker

### Render (avec Docker)

1. Créer un nouveau **Web Service**
2. Sélectionner **Docker** comme environnement
3. Dockerfile path : `back-end/Dockerfile`
4. Ajouter les variables d'environnement dans le dashboard Render

### Railway

1. Connecter votre repo GitHub
2. Railway détectera automatiquement le Dockerfile
3. Configurer les variables d'environnement

### Fly.io

```bash
# Installer flyctl
fly launch --dockerfile back-end/Dockerfile

# Configurer les secrets
fly secrets set EMAIL_USER=votre-email@gmail.com
fly secrets set EMAIL_PASSWORD=votre-mot-de-passe-application
# ... ajouter toutes les autres variables

# Déployer
fly deploy
```

## 🧪 Test de l'envoi d'emails

Après déploiement, testez :

1. **Inscription à un événement gratuit** → Email de confirmation
2. **Formulaire de contact** → Email reçu sur EMAIL_RECIPIENT
3. **Paiement Stripe** → Email après paiement

## 📝 Variables d'environnement requises

```
MONGODB_URI=
JWT_SECRET=
CLIENT_URL=
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=
EMAIL_PASSWORD=
EMAIL_RECIPIENT=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
PORT=5000
```

## ⚠️ Important

- **Ne jamais committer** le fichier `.env` avec vos vrais identifiants
- Utilisez des **mots de passe d'application Gmail**, pas votre mot de passe principal
- Vérifiez que le port 5000 est accessible depuis l'extérieur

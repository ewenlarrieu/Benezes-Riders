# Configuration du Keep-Alive Backend

Ce workflow GitHub Actions ping automatiquement votre backend toutes les 5 minutes pour éviter qu'il ne se mette en veille.

## 📋 Configuration

### 1. Ajouter l'URL du backend dans les secrets GitHub

1. Allez sur votre repository GitHub
2. Cliquez sur **Settings** → **Secrets and variables** → **Actions**
3. Cliquez sur **New repository secret**
4. Ajoutez :
   - **Name:** `BACKEND_URL`
   - **Value:** `https://votre-backend-url.onrender.com` (sans le `/health` à la fin)

### 2. Activer GitHub Actions

Si ce n'est pas déjà fait :

1. Allez dans l'onglet **Actions** de votre repository
2. Activez les workflows si demandé

### 3. Vérifier que ça fonctionne

1. Allez dans **Actions** → **Keep Backend Alive**
2. Vous pouvez lancer manuellement avec **Run workflow**
3. Vérifiez les logs pour voir si le ping fonctionne

## ⚙️ Modifier la fréquence

Dans le fichier `.github/workflows/keep-alive.yml`, modifiez la ligne cron :

```yaml
- cron: "*/5 * * * *" # Toutes les 5 minutes
- cron: "*/10 * * * *" # Toutes les 10 minutes
- cron: "0 * * * *" # Toutes les heures
```

## 📊 Comment ça marche

- GitHub Actions exécute automatiquement le workflow selon le planning
- Le workflow fait une requête GET vers `votre-url/health`
- Si le serveur répond 200 OK, tout va bien
- Si erreur, elle est loggée dans les Actions

## ⚠️ Important

- GitHub Actions peut avoir un léger délai (pas exactement toutes les 5 minutes)
- Les workflows peuvent être désactivés après 60 jours d'inactivité du repo
- C'est une solution 100% gratuite !

## 🔧 Alternative sans secret

Si vous ne voulez pas utiliser de secret GitHub, remplacez dans `keep-alive.yml` :

```yaml
BACKEND_URL="${{ secrets.BACKEND_URL || 'https://votre-backend-url.onrender.com' }}"
```

Par :

```yaml
BACKEND_URL="https://votre-url-directe.onrender.com"
```

# Configuration du formulaire de contact avec Nodemailer

## Configuration Email

Pour que le formulaire de contact fonctionne, vous devez configurer les variables d'environnement email dans votre fichier `.env` :

```env
# Configuration Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre.email@gmail.com
EMAIL_PASSWORD=votre_mot_de_passe_application
EMAIL_RECIPIENT=email.destinataire@example.com
```

## Configuration Gmail

Si vous utilisez Gmail, suivez ces étapes :

### 1. Activer l'authentification à deux facteurs

- Allez sur https://myaccount.google.com/security
- Activez la validation en deux étapes

### 2. Créer un mot de passe d'application

- Allez sur https://myaccount.google.com/apppasswords
- Sélectionnez "Mail" et votre appareil
- Générez le mot de passe
- Utilisez ce mot de passe (16 caractères) dans `EMAIL_PASSWORD`

### 3. Variables à configurer

- `EMAIL_HOST` : smtp.gmail.com
- `EMAIL_PORT` : 587
- `EMAIL_USER` : votre.email@gmail.com
- `EMAIL_PASSWORD` : le mot de passe d'application généré
- `EMAIL_RECIPIENT` : l'email où vous voulez recevoir les messages du formulaire

## Autres fournisseurs d'email

### Outlook/Hotmail

```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
```

### Yahoo

```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
```

### Service SMTP personnalisé

Utilisez les informations fournies par votre hébergeur.

## Test du formulaire

1. Configurez vos variables d'environnement
2. Redémarrez le serveur backend
3. Allez sur la page Contact
4. Remplissez et envoyez le formulaire
5. Vérifiez la réception de l'email à l'adresse configurée dans `EMAIL_RECIPIENT`

## Dépannage

### Erreur "Invalid login"

- Vérifiez que vous utilisez un mot de passe d'application (pas votre mot de passe Gmail)
- Vérifiez que l'authentification à deux facteurs est activée

### Erreur de connexion SMTP

- Vérifiez le `EMAIL_HOST` et `EMAIL_PORT`
- Vérifiez que votre pare-feu n'bloque pas le port 587

### Email non reçu

- Vérifiez les spams
- Vérifiez que `EMAIL_RECIPIENT` est correct
- Consultez les logs du serveur backend

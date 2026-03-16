# 📋 CAHIER DE TESTS - BENEZES RIDERS

**Date de création** : 27 janvier 2026  
**Version** : 1.0  
**Environnement** : Production (Netlify)

---

## 🔐 1. AUTHENTIFICATION ADMIN

### 1.1 Connexion

- [ ] Accéder à `/login`
- [  ] Tentative avec identifiants invalides → Message d'erreur
- [  ] Tentative avec mot de passe vide → Message d'erreur
- [  ] Connexion réussie avec bons identifiants → Redirection `/home`
- [  ] Cookie `adminToken` présent dans DevTools → Application > Cookies
- [  ] Cookie avec attributs `HttpOnly`, `Secure` (si HTTPS), `SameSite=Strict`

### 1.2 Déconnexion

- [  ] Cliquer sur icône Admin (navbar) → Déconnexion
- [  ] Cookie `adminToken` supprimé
- [  ] Sections admin disparaissent (boutons "Ajouter", "Modifier", "Supprimer")

### 1.3 Protection des routes

- [  ] Tenter de créer un album sans être admin → Erreur 401
- [  ] Tenter de supprimer un événement sans être admin → Erreur 401
- [  ] Rafraîchir la page en étant connecté → Session maintenue (cookie)

### 1.4 Rate Limiting (Sécurité)

- [ x ] Faire 5 tentatives de connexion rapides → Message "Trop de tentatives"
- [ x ] Attendre 15 minutes → Nouvelles tentatives autorisées

---

## 📸 2. GESTION DES ALBUMS

### 2.1 Affichage (Public)

- [ x ] Page `/photos` charge correctement
- [ x ] Tous les albums s'affichent avec leur image de couverture
- [ x ] Cliquer sur un album → Redirection vers `/album/:id`
- [ x ] Page détails album affiche toutes les photos en grille masonry
- [ x ] Cliquer sur une photo → Ouverture en fullscreen
- [ x ] Fermer fullscreen avec X ou clic en dehors

### 2.2 Création d'album (Admin)

- [ x ] Se connecter en admin
- [ x ] Sur `/photos`, cliquer "Ajouter un album"
- [ x ] Remplir formulaire (titre + image de couverture)
- [ x ] Valider → Album créé et visible immédiatement
- [ x ] Vérifier sur Cloudinary que l'image est uploadée

### 2.3 Modification d'album (Admin)

- [ x ] Cliquer "Modifier" sur un album
- [ x ] Changer le titre → Sauvegarde et mise à jour
- [ x ] Changer l'image de couverture → Nouvelle image visible

### 2.4 Suppression d'album (Admin)

- [ x ] Cliquer "Supprimer" sur un album
- [ x ] Confirmation → Album supprimé de la liste
- [ x ] Vérifier que l'album n'existe plus dans la base MongoDB

### 2.5 Gestion des photos (Admin)

- [ x ] Dans un album, cliquer "Ajouter des photos"
- [ x ] Sélectionner 3 photos → Upload et affichage immédiat
- [ x ] Cliquer "Supprimer" sur une photo → Photo retirée
- [ x ] Vérifier lazy loading : scroll → Images chargent progressivement

### 2.6 Validation

- [ x ] Tenter de créer un album sans titre → Message d'erreur
- [ x ] Tenter de créer un album sans image → Message d'erreur
- [ x ] Tenter d'uploader un fichier non-image → Rejet

---

## 🎉 3. GESTION DES ÉVÉNEMENTS

### 3.1 Affichage (Public)

- [ x ] Page `/events` charge correctement
- [ x ] Section "Prochain événement" affiche l'événement futur le plus proche
- [ x ] Informations visibles : titre, dates, lieu, description, prix

### 3.2 Création d'événement (Admin)

- [ x ] Se connecter en admin
- [ x ] Cliquer "Créer un événement"
- [ x ] Remplir formulaire complet (titre, dates, lieu, description, prix)
- [ x ] Prix = 0 → Événement gratuit
- [ x ] Prix > 0 → Événement payant
- [ x ] Valider → Événement créé et visible

### 3.3 Modification d'événement (Admin)

- [ x ] Cliquer "Modifier" sur un événement
- [ x ] Changer le prix de 0€ à 20€ → Sauvegarde
- [ x ] Changer les dates → Mise à jour correcte

### 3.4 Suppression d'événement (Admin)

- [ x ] Cliquer "Supprimer" sur un événement
- [ x ] Confirmation → Événement supprimé
- [ x ] Vérifier disparition de la liste

### 3.5 Inscription gratuite

- [ x ] Sur un événement gratuit (prix = 0€), cliquer "S'inscrire"
- [ x ] Remplir formulaire : nom, email, téléphone, message
- [ x ] Valider → Message de confirmation

### 3.6 Inscription payante (Stripe)

- [ x ] Sur un événement payant (prix > 0), cliquer "Payer avec Stripe"
- [ x ] Redirection vers Stripe Checkout
- [ x ] Remplir avec carte de test : `4242 4242 4242 4242`, date future, CVC aléatoire
- [ x ] Paiement validé → Redirection `/payment-success?session_id=xxx`
- [ x ] Page de confirmation affiche "Paiement réussi"
- [ x ] Vérifier dans Stripe Dashboard que le paiement est enregistré



### 3.8 Validation

- [ x ] Tenter de s'inscrire sans nom → Erreur
- [ x ] Tenter de s'inscrire avec email invalide → Erreur
- [ x ] Tenter de s'inscrire avec téléphone invalide → Erreur
- [ x ] Tenter de créer un événement avec date fin < date début → Erreur

---

## 📧 4. FORMULAIRE DE CONTACT

### 4.1 Envoi de message

- [ x ] Page `/contact` charge correctement
- [ x ] Remplir formulaire : nom, email, sujet, message
- [ x ] Valider → Message "Message envoyé avec succès"
- [ x ] Vérifier réception email à `Benezesriders164@gmail.com`
- [ x ] Email contient : nom, email, sujet, message avec mise en forme HTML

### 4.2 Rate Limiting (Sécurité)

- [ x ] Envoyer 3 messages rapidement → Bloqué au 4ème
- [ x ] Message "Trop de messages envoyés, réessayez dans 1 heure"

### 4.3 Validation

- [ x ] Tenter d'envoyer avec champ vide → Erreur
- [ x ] Tenter avec email invalide → Erreur
- [ x ] Tenter avec nom < 2 caractères → Erreur
- [ x ] Tenter avec message > 2000 caractères → Erreur
- [ x ] Vérifier que les caractères HTML sont échappés (pas d'injection XSS)

---

## 🏠 5. NAVIGATION & PAGES

### 5.1 Page d'accueil (`/`)

- [ x ] Hero section avec image de fond charge
- [ x ] Logo Benezes Riders visible dans about section
- [ x ] Section "Membres de l'équipe" affiche les membres
- [ x ] Bouton "Découvrir nos événements" → Redirection `/events`
- [ x ] Tous les textes sont lisibles

### 5.2 Navbar

- [ x ] Logo cliquable → Retour à `/home`
- [ x ] Liens : Accueil, Photos, Événements, Contact
- [ x ] Menu burger responsive sur mobile (<768px)
- [ x ] Icône admin visible en desktop
- [ x ] Si connecté : "Déconnexion" | Si non connecté : "Connexion"

### 5.3 Footer

- [ x ] Lien Facebook → Ouvre page Facebook dans nouvel onglet
- [ x ] Logo Facebook visible et réactif au hover

### 5.4 Lazy Loading (Performance)

- [ x ] Ouvrir DevTools > Network > Throttling "Fast 3G"
- [ x ] Naviguer vers `/` → Seulement page Home charge
- [ x ] Naviguer vers `/photos` → Page Photos charge (pas avant)
- [ x ] Vérifier dans Network : chunks séparés (Home.js, Photos.js, etc.)
- [ x ] Spinner "Chargement..." visible pendant transition

---















---

## 📝 NOTES & BUGS DÉTECTÉS

**Format** : `[Gravité] Description - Action`

Exemple :

- `[CRITIQUE] Login impossible après 3 tentatives - Ajuster rate limit`
- `[MINEUR] Image album décalée sur iPad - Fix CSS responsive`

---

**Testeur** : **\*\***\_\_\_**\*\***  
**Date des tests** : **\*\***\_\_\_**\*\***  
**Statut final** : ⬜ Approuvé ⬜ À corriger

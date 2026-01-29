# 📋 CAHIER DE TESTS - BENEZES RIDERS

**Date de création** : 27 janvier 2026  
**Version** : 1.0  
**Environnement** : Production (Netlify)

---

## 🔐 1. AUTHENTIFICATION ADMIN

### 1.1 Connexion

- [ x ] Accéder à `/login`
- [ x ] Tentative avec identifiants invalides → Message d'erreur
- [ x ] Tentative avec mot de passe vide → Message d'erreur
- [ x ] Connexion réussie avec bons identifiants → Redirection `/home`
- [ x ] Cookie `adminToken` présent dans DevTools → Application > Cookies
- [ x ] Cookie avec attributs `HttpOnly`, `Secure` (si HTTPS), `SameSite=Strict`

### 1.2 Déconnexion

- [ x ] Cliquer sur icône Admin (navbar) → Déconnexion
- [ x ] Cookie `adminToken` supprimé
- [ x ] Sections admin disparaissent (boutons "Ajouter", "Modifier", "Supprimer")

### 1.3 Protection des routes

- [ x ] Tenter de créer un album sans être admin → Erreur 401
- [ x ] Tenter de supprimer un événement sans être admin → Erreur 401
- [ x ] Rafraîchir la page en étant connecté → Session maintenue (cookie)

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

- [ ] Sur un événement payant (prix > 0), cliquer "Payer avec Stripe"
- [ ] Redirection vers Stripe Checkout
- [ ] Remplir avec carte de test : `4242 4242 4242 4242`, date future, CVC aléatoire
- [ ] Paiement validé → Redirection `/payment-success?session_id=xxx`
- [ ] Page de confirmation affiche "Paiement réussi"
- [ ] Vérifier dans Stripe Dashboard que le paiement est enregistré

### 3.7 Rate Limiting (Sécurité)

- [ ] S'inscrire 5 fois rapidement au même événement → Bloqué à la 6ème
- [ ] Message "Trop d'inscriptions"

### 3.8 Validation

- [ ] Tenter de s'inscrire sans nom → Erreur
- [ ] Tenter de s'inscrire avec email invalide → Erreur
- [ ] Tenter de s'inscrire avec téléphone invalide → Erreur
- [ ] Tenter de créer un événement avec date fin < date début → Erreur

---

## 📧 4. FORMULAIRE DE CONTACT

### 4.1 Envoi de message

- [ ] Page `/contact` charge correctement
- [ ] Remplir formulaire : nom, email, sujet, message
- [ ] Valider → Message "Message envoyé avec succès"
- [ ] Vérifier réception email à `Benezesriders164@gmail.com`
- [ ] Email contient : nom, email, sujet, message avec mise en forme HTML

### 4.2 Rate Limiting (Sécurité)

- [ ] Envoyer 3 messages rapidement → Bloqué au 4ème
- [ ] Message "Trop de messages envoyés, réessayez dans 1 heure"

### 4.3 Validation

- [ ] Tenter d'envoyer avec champ vide → Erreur
- [ ] Tenter avec email invalide → Erreur
- [ ] Tenter avec nom < 2 caractères → Erreur
- [ ] Tenter avec message > 2000 caractères → Erreur
- [ ] Vérifier que les caractères HTML sont échappés (pas d'injection XSS)

---

## 🏠 5. NAVIGATION & PAGES

### 5.1 Page d'accueil (`/`)

- [ ] Hero section avec image de fond charge
- [ ] Logo Benezes Riders visible dans about section
- [ ] Section "Membres de l'équipe" affiche les membres
- [ ] Bouton "Découvrir nos événements" → Redirection `/events`
- [ ] Tous les textes sont lisibles

### 5.2 Navbar

- [ ] Logo cliquable → Retour à `/home`
- [ ] Liens : Accueil, Photos, Événements, Contact
- [ ] Menu burger responsive sur mobile (<768px)
- [ ] Icône admin visible en desktop
- [ ] Si connecté : "Déconnexion" | Si non connecté : "Connexion"

### 5.3 Footer

- [ ] Lien Facebook → Ouvre page Facebook dans nouvel onglet
- [ ] Logo Facebook visible et réactif au hover

### 5.4 Lazy Loading (Performance)

- [ ] Ouvrir DevTools > Network > Throttling "Fast 3G"
- [ ] Naviguer vers `/` → Seulement page Home charge
- [ ] Naviguer vers `/photos` → Page Photos charge (pas avant)
- [ ] Vérifier dans Network : chunks séparés (Home.js, Photos.js, etc.)
- [ ] Spinner "Chargement..." visible pendant transition

---

## 📱 6. RESPONSIVE DESIGN

### 6.1 Mobile (< 768px)

- [ ] Navbar : Menu burger fonctionnel
- [ ] Images s'adaptent à la largeur écran
- [ ] Albums en grille 1 colonne
- [ ] Formulaires utilisables (pas de débordement)
- [ ] Texte lisible sans zoom

### 6.2 Tablette (768px - 1024px)

- [ ] Albums en grille 2 colonnes
- [ ] Navbar mixte (quelques liens visibles)
- [ ] Footer centré

### 6.3 Desktop (> 1024px)

- [ ] Albums en grille 3 colonnes
- [ ] Navbar complète (tous les liens visibles)
- [ ] Sections bien espacées
- [ ] Photos albums en masonry 3 colonnes

---

## 🔍 7. SEO & PERFORMANCE

### 7.1 Meta Tags

- [ ] Inspecter `<head>` : title "Benezes Riders | Association de Motards"
- [ ] Meta description présente
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Twitter Card tags
- [ ] Canonical URL : `https://benezes-riders.netlify.app/`
- [ ] Structured Data JSON-LD (schema.org Organization)

### 7.2 Fichiers SEO

- [ ] Accéder à `/robots.txt` → Fichier visible
- [ ] Contenu correct : Allow all, Disallow /login, Sitemap URL
- [ ] Accéder à `/sitemap.xml` → Fichier XML valide
- [ ] 4 URLs listées : /, /photos, /events, /contact

### 7.3 Images

- [ ] Inspecter images dans DevTools → Attribut `loading="lazy"` présent
- [ ] Scroll page d'accueil → Images chargent au fur et à mesure
- [ ] Logo navbar : `loading="eager"` (charge immédiatement)

### 7.4 Performance (Lighthouse)

- [ ] Ouvrir DevTools > Lighthouse
- [ ] Lancer audit "Performance" en mode Desktop
- [ ] Score > 90 ✅
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s

---

## 🛡️ 8. SÉCURITÉ

### 8.1 Cookies HttpOnly

- [ ] DevTools > Application > Cookies
- [ ] Cookie `adminToken` a l'attribut `HttpOnly` ✓
- [ ] Impossible de lire le cookie avec `document.cookie` dans Console
- [ ] Attribut `SameSite=Strict` présent

### 8.2 Headers HTTP (Helmet)

- [ ] Inspecter réponse backend dans Network
- [ ] Header `X-Frame-Options: DENY` présent
- [ ] Header `X-Content-Type-Options: nosniff` présent
- [ ] Header `Strict-Transport-Security` présent (si HTTPS)

### 8.3 Protection injections

- [ ] Tenter de créer un album avec titre `<script>alert('XSS')</script>` → Échappé
- [ ] Tenter de créer un événement avec `{"$gt": ""}` dans titre → Sanitisé
- [ ] Message de contact avec HTML → Échappé dans email reçu

### 8.4 Validation stricte

- [ ] Backend rejette username avec caractères spéciaux
- [ ] Backend rejette email invalide
- [ ] Backend rejette prix négatif pour événement
- [ ] Backend rejette date de fin avant date de début

---

## 💳 9. PAIEMENT STRIPE (Test Mode)

### 9.1 Configuration

- [ ] Variables d'environnement Stripe configurées dans backend
- [ ] Mode test activé (clés commencent par `pk_test_` et `sk_test_`)

### 9.2 Scénarios de paiement

- [ ] Paiement réussi : Carte `4242 4242 4242 4242` → Success
- [ ] Paiement refusé : Carte `4000 0000 0000 0002` → Declined
- [ ] Authentification 3D Secure : Carte `4000 0025 0000 3155` → Popup confirmation
- [ ] Vérifier session Stripe valide après paiement
- [ ] Webhook Stripe appelé (si configuré)

### 9.3 Vérifications

- [ ] Stripe Dashboard > Paiements → Transaction visible
- [ ] Montant correct
- [ ] Email client enregistré
- [ ] Metadata événement présent (eventId, name)

---

## 🌐 10. DÉPLOIEMENT (Netlify)

### 10.1 Build & Deploy

- [ ] Commit et push sur GitHub
- [ ] Netlify détecte le push et lance le build
- [ ] Build réussit sans erreur
- [ ] Site déployé sur `https://benezes-riders.netlify.app`

### 10.2 Variables d'environnement

- [ ] Backend : `CLIENT_URL` = URL Netlify
- [ ] Frontend : `VITE_API_URL` = URL backend (Heroku/Render/Railway)
- [ ] Toutes les variables sensibles configurées dans Netlify UI

### 10.3 CORS

- [ ] Frontend peut appeler backend sans erreur CORS
- [ ] Cookies envoyés correctement entre domaines
- [ ] Vérifier header `Access-Control-Allow-Credentials: true`

---

## 📊 11. TESTS COMPLÉMENTAIRES

### 11.1 Erreurs 404

- [ ] Accéder à `/page-inexistante` → Page 404 ou redirection
- [ ] URL invalide pour album `/album/999` → Erreur propre

### 11.2 Concurrence

- [ ] Ouvrir 2 onglets admin
- [ ] Créer un album dans l'onglet 1 → Visible dans onglet 2 après refresh
- [ ] Supprimer un album dans un onglet → Disparaît de l'autre

### 11.3 Offline / Réseau lent

- [ ] DevTools > Network > Offline
- [ ] Tenter de charger la page → Message d'erreur propre
- [ ] Repasser Online → Site fonctionne normalement

### 11.4 Navigateurs

- [ ] Chrome/Edge (Chromium) ✓
- [ ] Firefox ✓
- [ ] Safari (macOS/iOS) ✓

---

## ✅ CRITÈRES DE VALIDATION

**Site prêt pour production SI :**

- ✅ Tous les tests fonctionnels passent (sections 1-5)
- ✅ Aucune erreur console critique
- ✅ Rate limiting fonctionne (protection brute-force)
- ✅ Validation backend rejette données invalides
- ✅ SEO configuré (sitemap, robots.txt, meta tags)
- ✅ Performance Lighthouse > 80
- ✅ Responsive sur mobile/tablette/desktop
- ✅ Paiement Stripe fonctionne en test mode
- ✅ Cookies HttpOnly configurés
- ✅ 0 vulnérabilité npm

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

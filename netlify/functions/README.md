# Netlify Functions · Gang4 blog

## `submit-lead-magnet.ts`

Reçoit les soumissions du formulaire lead magnet (20 créas UGC) et envoie un email de confirmation au visiteur via SMTP Gmail (`samuel@gang4.io`). Samuel reçoit chaque lead en BCC.

### Setup initial (5 minutes, une seule fois)

#### 1. Générer un App Password Gmail

L'App Password remplace ton vrai mot de passe pour les apps tierces qui se connectent en SMTP. Il ne donne pas accès à ton compte Gmail au sens large.

1. Activer la 2FA sur le compte `samuel@gang4.io` si pas déjà fait : <https://myaccount.google.com/security>
2. Aller sur <https://myaccount.google.com/apppasswords>
3. Créer un App Password nommé "Gang4 blog lead magnet"
4. Copier le mot de passe à 16 caractères (avec ou sans espaces, les deux fonctionnent)

#### 2. Ajouter les variables d'environnement dans Netlify

1. Aller sur <https://app.netlify.com> → site `gang4-blog`
2. Site settings → Environment variables → Add variable
3. Ajouter ces 2 variables :

| Clé | Valeur |
|---|---|
| `GMAIL_USER` | `samuel@gang4.io` |
| `GMAIL_APP_PASSWORD` | Le mot de passe 16 caractères généré à l'étape 1 |

4. Trigger un redeploy : Deploys → Trigger deploy → Clear cache and deploy site

#### 3. Tester en prod

1. Aller sur un article du blog (par exemple https://blog.gang4.io/blog/funnel-meta-ads-tofu-mofu-bofu-dnvb/)
2. Soumettre le formulaire avec une vraie adresse email
3. Vérifier dans la boîte de réception : l'email "Tes 20 créas UGC arrivent (sous 72h)" doit être reçu
4. Vérifier dans `samuel@gang4.io` : la copie BCC doit être visible

### Endpoint

`POST /api/submit-lead-magnet`

Payload accepté (JSON ou form-encoded) :

```json
{
  "email": "visiteur@example.com",
  "lead_magnet": "20 créas UGC gratuites prêtes à diffuser en Partnership Ads",
  "source_url": "https://blog.gang4.io/blog/meta-partnership-ads-guide-complet-dnvb/"
}
```

Réponse succès :

```json
{ "ok": true }
```

Réponses erreur :

```json
{ "error": "Email invalide" }     // 400
{ "error": "Payload invalide" }   // 400
{ "error": "Method not allowed" } // 405
{ "error": "Configuration serveur manquante" } // 500 (env vars absentes)
{ "error": "Impossible d'envoyer l'email..." } // 500 (SMTP fail)
```

### Limites Gmail à connaître

- **500 emails/jour** (Gmail perso) ou **2 000/jour** (Google Workspace, ce que `samuel@gang4.io` est probablement)
- Pas de séquence email automatique (juste l'email de bienvenue)
- Pas de tracking ouvertures/clics natif
- Si volume monte fort (>50 leads/jour stables), envisager migration vers Resend, Brevo ou Loops pour une stack ESP dédiée

### Debug local

Les Netlify Functions tournent avec Netlify CLI :

```bash
npm install -g netlify-cli
netlify dev
```

Tu peux ensuite tester `POST http://localhost:8888/api/submit-lead-magnet` avec curl ou Postman.

### Logs en prod

`app.netlify.com` → site → Functions → `submit-lead-magnet` → Logs.
Les erreurs `console.error` sont visibles ici. Les soumissions normales ne sont pas loggées (à activer si besoin).

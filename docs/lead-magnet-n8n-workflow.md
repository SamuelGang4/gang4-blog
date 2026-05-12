# Lead magnet · workflow n8n (3 nœuds)

Le formulaire de capture (`SidebarLeadMagnet.astro`) POST en JSON vers un webhook n8n. n8n se charge ensuite d'envoyer un email de confirmation avec les credentials Gmail OAuth déjà configurés.

## Payload reçu par le webhook

```json
{
  "email": "visiteur@example.com",
  "lead_magnet": "Reçois 20 créas UGC gratuites prêtes à diffuser en Partnership Ads",
  "source_url": "https://blog.gang4.io/blog/meta-partnership-ads-guide-complet-dnvb/",
  "submitted_at": "2026-05-13T10:42:00.000Z"
}
```

## Workflow à créer dans n8n (3 nœuds)

### Nœud 1 · Webhook (Trigger)

- **HTTP Method** : `POST`
- **Path** : `gang4-lead-magnet` (ou nom de ton choix, à reporter dans l'URL finale)
- **Response Mode** : `Last Node`
- **Response Code** : `200`
- **Authentication** : `None` (le honeypot anti-bot côté form filtre la majorité, on peut durcir plus tard si spam)

URL finale du webhook (à copier dans `.env` du blog) :

```
https://<ton-instance-n8n>/webhook/gang4-lead-magnet
```

### Nœud 2 · IF (optionnel · validation email basique)

Pour rejeter les payloads sans email valide avant d'invoquer Gmail.

- **Condition** : `{{ $json.email }}` matches regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`
- Si `true` → continue vers Gmail
- Si `false` → branche d'erreur (return 400 ou drop)

### Nœud 3 · Gmail (Send Email)

- **Credentials** : Gmail OAuth déjà configurée chez toi (samuel@gang4.io)
- **Resource** : `Message`
- **Operation** : `Send`
- **To** : `={{ $json.email }}`
- **Subject** : `Tes 20 créas UGC arrivent (sous 72h)`
- **Email Type** : `HTML`
- **Bcc** : `samuel@gang4.io` (pour traquer chaque lead)
- **Reply-To** : `samuel@gang4.io`
- **Message (HTML)** :

```html
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 24px;">

  <p>Salut,</p>

  <p>Reçu ta demande pour les <strong>20 créas UGC</strong>. On démarre maintenant.</p>

  <p>Nos IA et notre équipe créa vont analyser ta marque (ton site, ton positionnement, ton audience, tes mécaniques de scaling) et produire <strong>20 créatifs vraiment personnalisés</strong>. Pas un template recyclé, pas du UGC générique pioché dans une banque. 20 créas pensées pour ton produit, ton univers et tes personas.</p>

  <p>Tu reçois tout d'ici <strong>72h max</strong>, directement en réponse à cet email.</p>

  <p>Si tu veux qu'on te pose 2-3 questions pour cadrer plus serré, réponds à ce mail avec :</p>
  <ul style="padding-left: 20px;">
    <li>L'URL de ton site</li>
    <li>1 ou 2 références créa que tu trouves bien faites dans ta verticale</li>
    <li>Ce que tu veux qu'on évite (claims interdits, ton à éviter, etc.)</li>
  </ul>

  <p>C'est optionnel. Sans ces infos, on part sur notre analyse propre.</p>

  <p>À très vite,<br/>
  <strong>Samuel</strong><br/>
  Co-founder Gang4<br/>
  <a href="https://gang4.io" style="color: #5f6dff;">gang4.io</a></p>

  <p style="color: #666; font-size: 14px; margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee;">
    P.S. Tu peux répondre directement à cet email, c'est ma vraie adresse.
  </p>

</body>
</html>
```

## Configuration côté blog

### En dev local

Créer un fichier `.env` à la racine du repo (gitignored) :

```
PUBLIC_N8N_LEAD_MAGNET_WEBHOOK=https://<ton-instance-n8n>/webhook/gang4-lead-magnet
```

### En prod (Netlify)

Site settings → Environment variables → Add a variable :

| Clé | Valeur |
|---|---|
| `PUBLIC_N8N_LEAD_MAGNET_WEBHOOK` | `https://<ton-instance-n8n>/webhook/gang4-lead-magnet` |

Puis Deploys → Trigger deploy → **Clear cache and deploy site**.

## Tester en prod

1. Aller sur n'importe quel article : https://blog.gang4.io/blog/funnel-meta-ads-tofu-mofu-bofu-dnvb/
2. Soumettre le formulaire avec une vraie adresse email perso
3. Vérifier dans la boîte perso : email "Tes 20 créas UGC arrivent (sous 72h)" reçu, expéditeur "Samuel @ Gang4 <samuel@gang4.io>"
4. Vérifier dans `samuel@gang4.io` : copie BCC visible
5. Dans n8n → Executions : voir l'exécution réussie avec le payload

## Pourquoi cette stack

- ✅ **Zero credentials côté blog** : pas d'App Password, pas d'API key SendGrid
- ✅ **Credentials Gmail OAuth déjà dans n8n** : aucun setup supplémentaire
- ✅ **Modifiable sans toucher au code** : changer le wording de l'email ? Tu édites le nœud Gmail dans n8n, pas besoin de redéployer le blog
- ✅ **Extensible** : tu peux ajouter Slack notif, Notion log, push CRM, etc. en ajoutant des nœuds n8n
- ✅ **Pas de package supplémentaire** dans le repo : moins de surface de maintenance

## Anti-spam

Le formulaire intègre un champ **honeypot** invisible (`name="website"`, position `left:-9999px`). Les bots qui le remplissent sont filtrés côté client avant tout POST vers n8n.

Si du spam passe quand même, durcir côté n8n :
- Ajouter un nœud HTTP Request → Cloudflare Turnstile (vérification token)
- Ou simplement un nœud IF qui rejette les emails contenant `+test`, `@example.com`, etc.
- Ou un rate limiter sur l'IP source via le header X-Forwarded-For dans le payload Webhook

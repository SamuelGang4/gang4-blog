/**
 * Netlify Function · submit-lead-magnet
 *
 * Reçoit les soumissions du formulaire lead magnet (20 créas UGC).
 * Envoie un email de confirmation au visiteur via SMTP Gmail (samuel@gang4.io)
 * et met Samuel en BCC pour traquer chaque lead entrant.
 *
 * Variables d'environnement requises (à configurer dans Netlify Dashboard) :
 *   GMAIL_USER          → samuel@gang4.io
 *   GMAIL_APP_PASSWORD  → app password Google (16 caractères, sans espaces)
 *
 * Génération de l'App Password (5 min) :
 *   1. Activer la 2FA sur le compte Google
 *   2. https://myaccount.google.com/apppasswords
 *   3. Créer "Gang4 blog lead magnet" → copier le mot de passe 16 chars
 *   4. Coller dans Netlify Dashboard → Site settings → Environment variables
 */

import nodemailer from 'nodemailer';
import type { Context } from '@netlify/functions';

interface SubmitPayload {
  email?: string;
  lead_magnet?: string;
  source_url?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async (req: Request, _context: Context) => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  // Parse payload : support JSON et form-encoded pour robustesse
  let payload: SubmitPayload = {};
  try {
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      payload = (await req.json()) as SubmitPayload;
    } else {
      const formData = await req.formData();
      payload = Object.fromEntries(formData.entries()) as SubmitPayload;
    }
  } catch {
    return Response.json({ error: 'Payload invalide' }, { status: 400 });
  }

  const email = (payload.email || '').trim().toLowerCase();
  const leadMagnet = (payload.lead_magnet || '20 créas UGC').trim();
  const sourceUrl = (payload.source_url || 'inconnue').trim();

  if (!EMAIL_REGEX.test(email)) {
    return Response.json({ error: 'Email invalide' }, { status: 400 });
  }

  // Setup Gmail SMTP
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD env vars');
    return Response.json({ error: 'Configuration serveur manquante' }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  const subject = 'Tes 20 créas UGC arrivent (sous 72h)';

  const textBody = `Salut,

Reçu ta demande pour les 20 créas UGC. On démarre maintenant.

Nos IA et notre équipe créa vont analyser ta marque (ton site, ton positionnement, ton audience, tes mécaniques de scaling) et produire 20 créatifs vraiment personnalisés. Pas un template recyclé, pas du UGC générique pioché dans une banque. 20 créas pensées pour ton produit, ton univers et tes personas.

Tu reçois tout d'ici 72h max, directement en réponse à cet email.

Si tu veux qu'on te pose 2-3 questions pour cadrer plus serré, réponds à ce mail avec :
- L'URL de ton site
- 1 ou 2 références créa que tu trouves bien faites dans ta verticale
- Ce que tu veux qu'on évite (claims interdits, ton à éviter, etc.)

C'est optionnel. Sans ces infos, on part sur notre analyse propre.

À très vite,
Samuel
Co-founder Gang4
https://gang4.io

P.S. Tu peux répondre directement à cet email, c'est ma vraie adresse.
`;

  const htmlBody = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Tes 20 créas UGC arrivent</title>
</head>
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
</html>`;

  try {
    await transporter.sendMail({
      from: `Samuel @ Gang4 <${gmailUser}>`,
      to: email,
      bcc: gmailUser, // Samuel reçoit BCC sur chaque lead
      replyTo: gmailUser,
      subject,
      text: textBody,
      html: htmlBody,
      headers: {
        'X-Lead-Magnet': leadMagnet,
        'X-Source-Url': sourceUrl,
      },
    });
  } catch (err) {
    console.error('Mail send failed:', err);
    return Response.json(
      { error: "Impossible d'envoyer l'email pour l'instant. Réessaie ou écris-nous à samuel@gang4.io" },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
};

// Config Netlify : path personnalisé pour clarté
export const config = {
  path: '/api/submit-lead-magnet',
};

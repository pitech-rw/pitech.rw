/**
 * One-time helper to obtain a Google OAuth refresh token for Calendar + Meet.
 *
 * Usage (from repo root):
 *   npx tsx scripts/google-calendar-auth.ts
 *
 * Reads GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET from .env (or the environment).
 * Open the printed URL, approve access, then copy GOOGLE_REFRESH_TOKEN into .env.
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { google } from 'googleapis';

const REDIRECT_URI = 'http://127.0.0.1:53682/oauth2callback';
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

function loadEnvFile() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const envPath = path.join(root, '.env');
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

async function main() {
  loadEnvFile();

  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();

  if (!clientId || !clientSecret) {
    console.error(
      'Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET.\n' +
        'Add them to .env, or run:\n' +
        '  export GOOGLE_CLIENT_ID=...\n' +
        '  export GOOGLE_CLIENT_SECRET=...\n' +
        '  npx tsx scripts/google-calendar-auth.ts',
    );
    process.exit(1);
  }

  const oauth2 = new google.auth.OAuth2(clientId, clientSecret, REDIRECT_URI);
  const authUrl = oauth2.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: SCOPES,
  });

  console.log('\nOpen this URL in your browser:\n');
  console.log(authUrl);
  console.log('\nWaiting for OAuth callback on', REDIRECT_URI, '…\n');

  const code = await new Promise<string>((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        const url = new URL(req.url ?? '/', REDIRECT_URI);
        if (url.pathname !== '/oauth2callback') {
          res.writeHead(404);
          res.end('Not found');
          return;
        }
        const authCode = url.searchParams.get('code');
        if (!authCode) {
          const errMsg = url.searchParams.get('error') ?? 'Missing code';
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end(errMsg);
          reject(new Error(errMsg));
          server.close();
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(
          '<h1>Authorized</h1><p>You can close this tab and return to the terminal.</p>',
        );
        server.close();
        resolve(authCode);
      } catch (err) {
        reject(err);
        server.close();
      }
    });
    server.on('error', reject);
    server.listen(53682, '127.0.0.1');
  });

  const { tokens } = await oauth2.getToken(code);
  if (!tokens.refresh_token) {
    console.error(
      '\nNo refresh_token returned. Revoke the app at https://myaccount.google.com/permissions then run again.\n',
    );
    process.exit(1);
  }

  console.log('\nAdd / update these in your .env:\n');
  console.log(`GOOGLE_CLIENT_ID=${clientId}`);
  console.log(`GOOGLE_CLIENT_SECRET=${clientSecret}`);
  console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
  console.log('GOOGLE_CALENDAR_ID=primary\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

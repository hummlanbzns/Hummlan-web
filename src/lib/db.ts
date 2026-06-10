import { createClient } from '@libsql/client';

const url = process.env.TEAM_DB_URL;
const authToken = process.env.TEAM_DB_AUTH_TOKEN;

if (!url || !authToken) {
  throw new Error('TEAM_DB_URL and TEAM_DB_AUTH_TOKEN must be set');
}

export const db = createClient({
  url,
  authToken,
});

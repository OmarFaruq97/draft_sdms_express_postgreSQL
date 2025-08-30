// services/googleDriveService.js
import fs from "fs";
import { google } from "googleapis";

const CREDENTIALS_PATH = "oauth_client.json";
const TOKEN_PATH = "tokens.json";

// Load OAuth client
function getDriveClient() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf-8"));
  const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));

  const { client_id, client_secret, redirect_uris } = credentials.installed;

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  oAuth2Client.setCredentials(tokens);

  return google.drive({ version: "v3", auth: oAuth2Client });
}

// 👉 এখানে default export হচ্ছে ready client
const drive = getDriveClient();
export default drive;

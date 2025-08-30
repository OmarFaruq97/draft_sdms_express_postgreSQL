import fs from "fs";
import readline from "readline";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
const TOKEN_PATH = "tokens.json";

// তোমার oauth_client.json ফাইলের path
const credentials = JSON.parse(fs.readFileSync("oauth_client.json", "utf8"));

const { client_secret, client_id } = credentials.installed;
const redirect_uris = ["urn:ietf:wg:oauth:2.0:oob"]; // <<== important

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

getAccessToken(oAuth2Client);

function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("🔑 Authorize this app by visiting this URL:\n", authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("👉 Paste the code here: ", async (code) => {
    try {
      const { tokens } = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(tokens);
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
      console.log("✅ Token stored to", TOKEN_PATH);
    } catch (err) {
      console.error("❌ Error retrieving access token", err);
    }
    rl.close();
  });
}

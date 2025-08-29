import { google } from "googleapis";
import fs from "fs";

const KEYFILEPATH = "credentials.json"; // আপনার google service account credentials
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

// Upload
export async function uploadFileToDrive(filePath, fileName, mimeType) {
  const fileMetadata = { name: fileName };
  const media = { mimeType, body: fs.createReadStream(filePath) };

  const res = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: "id",
  });

  return res.data.id;
}

// Download
export async function downloadFileFromDrive(fileId, destPath) {
  const dest = fs.createWriteStream(destPath);
  const res = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );
  return new Promise((resolve, reject) => {
    res.data
      .on("end", () => resolve(destPath))
      .on("error", (err) => reject(err))
      .pipe(dest);
  });
}

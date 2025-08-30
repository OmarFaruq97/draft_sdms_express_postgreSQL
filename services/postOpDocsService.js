import fs from "fs";
import drive from "./googleDriveService.js";

import { callProcedure } from "../utils/procedureCaller.js";

const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID; // .env থেকে ফোল্ডার আইডি নেবে

// =============================
// 📤 Upload Document to Drive
// =============================
export async function uploadDocument(file, params) {
  try {
    const fileMetaData = {
      name: file.originalname,
      parents: [FOLDER_ID], // Google Drive folder ID
    };

    const media = {
      mimeType: file.mimetype,
      body: fs.createReadStream(file.path),
    };

    // 🟢 Upload file to Google Drive
    const response = await drive.files.create({
      requestBody: fileMetaData,
      media: media,
      fields: "id, name",
    });

    // 🟢 DB তে ফাইলের তথ্য save করবে
    params.file_id = response.data.id;
    params.file_name = response.data.name;
    await callProcedure("sdms_db.prc_post_op_docs_crud", params);

    // 🟢 লোকাল টেম্প ফাইল ডিলিট
    fs.unlinkSync(file.path);

    return {
      success: true,
      message: "File uploaded successfully",
      fileId: response.data.id,
    };
  } catch (error) {
    console.error("❌ Upload Error:", error);
    return { success: false, message: error.message };
  }
}

// =============================
// 📥 Download Document from Drive
// =============================
export async function downloadDocument(fileId) {
  try {
    const response = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "stream" }
    );
    return response.data; // stream আকারে return করবে
  } catch (error) {
    console.error("❌ Download Error:", error);
    throw new Error("Failed to download file");
  }
}

// =============================
// 📋 Get Docs List from DB
// =============================
export async function getDocs(params) {
  return await callProcedure("sdms_db.prc_post_op_docs_crud", params);
}

// =============================
// 🔎 Get single doc by ID from DB
// =============================
export async function getDocById(params) {
  return await callProcedure("sdms_db.prc_post_op_docs_crud", params);
}

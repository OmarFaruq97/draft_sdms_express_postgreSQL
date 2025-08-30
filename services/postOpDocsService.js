// services/postOpDocsService.js
import pool from "../config/db.js";
import drive from "./googleDriveService.js";
import fs from "fs";
import dotenv from "dotenv";

const DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

async function callProcedure(procName, params) {
  const client = await pool.connect();
  try {
    const refCursor = "ref";
    await client.query("BEGIN");
    await client.query(`CALL ${procName}($1::json, $2)`, [
      JSON.stringify(params),
      refCursor,
    ]);
    const result = await client.query(`FETCH ALL IN ${refCursor}`);
    await client.query("COMMIT");

    return {
      success: true,
      message: "successfully",
      data: result.rows, // ✅ DB থেকে আসল ডাটা ফেরত আসবে
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

// 🔹 Upload Document + Insert DB
export async function uploadDocument(file, body) {
  // Step 1: Upload to Google Drive
  // Step 1: Upload to Google Drive
  //change
  const fileMetadata = {
    name: file.originalname,
    parents: [DRIVE_FOLDER_ID], // ✅ .env
  };
  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: "id",
  });

  const driveFileId = response.data.id;
  console.log("✅ File uploaded to Google Drive:", driveFileId);
  //change

  // Step 2: Insert into DB using procedure
  const params = {
    action_mode: "insert",
    patient_id: body.patient_id,
    hospital_id: body.hospital_id,
    admission_id: body.admission_id,
    doctor_id: body.doctor_id,
    file_name: file.originalname,
    file_type: file.mimetype,
    document_type: body.document_type,
    drive_file_id: driveFileId,
    remarks: body.remarks,
    insert_by: body.insert_by || "system",
  };

  return await callProcedure("sdms_db.prc_post_op_docs_crud", params);
}

// 🔹 Download Document
export async function downloadDocument(fileId) {
  const response = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );
  return response.data;
}

// 🔹 Get Docs List
export async function getDocs(params) {
  return await callProcedure("sdms_db.prc_post_op_docs_crud", params);
}

// 🔹 Get Doc By ID
export async function getDocById(params) {
  return await callProcedure("sdms_db.prc_post_op_docs_crud", params);
}

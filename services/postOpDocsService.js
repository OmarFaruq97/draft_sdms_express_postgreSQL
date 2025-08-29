import fs from "fs";
import { drive } from "./googleDriveService.js";
import { callProcedure } from "../utils/procedureCaller.js";


const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;


export async function uploadDocument(file, params) {
    try {
        const fileMetaData = {
            name: file.originalname,
            parents: [FOLDER_ID],
        };

        const media = {
            mimeType: file.mimetype,
            body: fs.createReadStream(file.path),
        };

        const response = await drive.files.create({
            requestBody: fileMetaData,
            media: media,
            fields: "id, name",
        });

        // Save info in DB using stored procedure
        params.file_id = response.data.id;
        params.file_name = response.data.name;
        await callProcedure("sdms_db.prc_post_op_docs_crud", params);

        // Delete local temp file
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

// Download file from Google Drive
export async function downloadDocument(fileId) {
    try {
        const response = await drive.files.get(
            { fileId, alt: "media" },
            { responseType: "stream" }
        );
        return response.data; // stream
    } catch (error) {
        console.error("❌ Download Error:", error);
        throw new Error("Failed to download file");
    }
}

// Get docs list from DB
export async function getDocs(params) {
    return await callProcedure("sdms_db.prc_post_op_docs_crud", params);
}

// Get single doc by id
export async function getDocById(params) {
    return await callProcedure("sdms_db.prc_post_op_docs_crud", params);
}

// controllers/postOpDocsController.js
import {
  uploadDocument,
  downloadDocument,
  getDocs,
  getDocById,
} from "../services/postOpDocsService.js";

// Upload Controller
export async function uploadDoc(req, res) {
  try {
    const result = await uploadDocument(req.file, req.body);
    res.json(result);
  } catch (error) {
    console.error("❌ Controller Upload Error:", error);
    res.status(500).json({ success: false, message: error.message });
    console.log("📌 Params going to procedure:", params);
    await callProcedure("sdms_db.prc_post_op_docs_crud", params);

  }
}

// Download Controller
export async function downloadDoc(req, res) {
  try {
    const fileStream = await downloadDocument(req.params.fileId);
    fileStream.pipe(res);
  } catch (error) {
    console.error("❌ Controller Download Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// Get Docs List
export async function getDocsList(req, res) {
  try {
    const result = await getDocs(req.body);
    res.json(result);
  } catch (error) {
    console.error("❌ Controller GetDocs Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// Get Doc by ID
export async function getDocByIdController(req, res) {
  try {
    const result = await getDocById(req.body);
    res.json(result);
  } catch (error) {
    console.error("❌ Controller GetDocById Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

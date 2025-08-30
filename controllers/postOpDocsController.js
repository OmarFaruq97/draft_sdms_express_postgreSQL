// controllers/postOpDocsController.js
import {
  uploadDocument,
  downloadDocument,
  getDocs,
  getDocById,
} from "../services/postOpDocsService.js";

// 🔹 Upload + Insert Controller
export async function uploadDoc(req, res) {
  try {
    const result = await uploadDocument(req.file, req.body);

    res.json(result);
  } catch (error) {
    
    console.error("❌ Controller Upload Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// 🔹 Download Controller
export async function downloadDoc(req, res) {
  try {
    const fileStream = await downloadDocument(req.params.fileId);
    fileStream.pipe(res);
  } catch (error) {
    console.error("❌ Controller Download Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// 🔹 Get Docs List Controller
export async function getDocsList(req, res) {
  try {
    const result = await getDocs({ action_mode: "getList" });
    res.json(result);
  } catch (error) {
    console.error("❌ Controller GetDocs Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// 🔹 Get Doc by ID Controller
export async function getDocByIdController(req, res) {
  try {
    const result = await getDocById({
      action_mode: "getById",
      id: req.body.id,
    });
    res.json(result);
  } catch (error) {
    console.error("❌ Controller GetDocById Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// 🔹 Delete Doc Controller
export async function deleteDocController(req, res) {
  try {
    // ✅ user যেভাবে পাঠাবে ঠিক সেভাবেই service এ পাঠানো হবে
    const result = await getDocs(req.body);
    res.json(result);
  } catch (error) {
    console.error("❌ Controller Delete Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}


/*
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
*/
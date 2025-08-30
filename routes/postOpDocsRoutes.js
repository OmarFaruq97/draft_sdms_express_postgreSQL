// routes/postOpDocsRoutes.js
import express from "express";
import multer from "multer";
import {
  uploadDoc,
  downloadDoc,
  getDocsList,
  getDocByIdController,
} from "../controllers/postOpDocsController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Upload
router.post("/upload", upload.single("file"), uploadDoc);

// Download
router.get("/download/:fileId", downloadDoc);

// Get list
router.get("/", getDocsList);

// Get by id
router.post("/getById", getDocByIdController);

export default router;

// routes/postOpDocsRoutes.js
import express from "express";
import multer from "multer";
import {
  uploadDoc,
  downloadDoc,
  getDocsList,
  getDocByIdController,
  deleteDocController,
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

// Delete
router.post("/", deleteDocController);

export default router;

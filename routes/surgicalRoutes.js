import express from "express";
import { handleSurgical } from "../controllers/surgicalController.js";

const router = express.Router();

// surgical data endpoint
router.post("/", handleSurgical);

export default router;

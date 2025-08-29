import express from "express";
import { handlePreSurgical } from "../controllers/preSurgicalController.js";

const router = express.Router();

// pre-surgical data endpoint
router.post("/", handlePreSurgical);

export default router;

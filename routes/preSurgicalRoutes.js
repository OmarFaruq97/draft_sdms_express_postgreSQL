import express from "express";
import { handlePreSurgical } from "../controllers/preSurgicalController.js";

const router = express.Router();

router.post("/", handlePreSurgical);

export default router;

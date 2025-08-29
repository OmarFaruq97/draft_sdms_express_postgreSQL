import express from "express";
import surgicalRoutes from "./surgicalRoutes.js";
import preSurgicalRoutes from "./preSurgicalRoutes.js";

const router = express.Router();

router.use("/surgical", surgicalRoutes);
router.use("/pre-surgical", preSurgicalRoutes);

export default router;

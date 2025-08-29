import express from "express";
import surgicalRoutes from "./surgicalRoutes.js";
import preSurgicalRoutes from "./preSurgicalRoutes.js";
import postOpDocsRoutes from "./postOpDocsRoutes.js";



const router = express.Router();

router.use("/surgical", surgicalRoutes);
router.use("/pre-surgical", preSurgicalRoutes);
router.use("/post-op-docs", postOpDocsRoutes);

export default router;

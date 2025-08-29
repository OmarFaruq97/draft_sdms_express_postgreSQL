import { callProcedure } from "../utils/procedureCaller.js";

export async function handleSurgical(req, res) {
  try {
    const data = await callProcedure("sdms_db.prc_surgical_data_crud", req.body);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}


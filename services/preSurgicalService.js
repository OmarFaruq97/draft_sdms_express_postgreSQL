import { callProcedure } from "../utils/procedureCaller.js";

// Pre-Surgical Data Service
export async function preSurgicalService(params) {
  return await callProcedure("sdms_db.prc_pre_surgical_data_crud", params);
}

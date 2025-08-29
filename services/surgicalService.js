import { callProcedure } from "../utils/procedureCaller.js";


// Surgical Data Service
export async function surgicalService(data) {
  return await callProcedure("sdms_db.prc_surgical_data_crud", data);
}

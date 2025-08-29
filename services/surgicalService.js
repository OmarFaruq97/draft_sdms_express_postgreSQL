import { callProcedure } from "../utils/procedureCaller.js";

export async function surgicalService(data) {
  return await callProcedure("sdms_db.prc_surgical_data_crud", data);
}

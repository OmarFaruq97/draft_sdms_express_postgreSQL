/* //correct code for surgical crud
import pool from "../config/db.js";

export async function callProcedure(procName, params) {
  try {
    const query = `CALL ${procName}($1::json)`;
    const values = [JSON.stringify(params)];

    await pool.query(query, values);


    return {
      success: true,
      message: "successfully",
      data: [params]
    };
  } catch (err) {
    console.error("❌ Procedure call error:", err);
    throw err;
  }
}
//right code*/

import pool from "../config/db.js";

export async function callProcedure(procName, params) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");


    await client.query(`CALL ${procName}($1::json, $2)`, [
      JSON.stringify(params),
      "mycursor",
    ]);

    // fetch the cursor
    const result = await client.query("FETCH ALL FROM mycursor");

    await client.query("COMMIT");

    return {
      success: true,
      message: "successfully",
      data: [params],
    };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Procedure call error:", err);
    throw err;
  } finally {
    client.release();
  }
}

// server-be/setPassword.js
// -----------------------------------------------------
// Laboratorio VIII - Programación Web
// Script para actualizar la contraseña de Jerry
// -----------------------------------------------------
import bcrypt from "bcrypt";
import { pool } from "./config/db.js"; 

const newPassword = process.argv[2]; 
if (!newPassword) {
  console.error("Uso: node setPassword.js \"NuevaPassword123\"");
  process.exit(1);
}

(async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    const email = "jerry@example.com";
    const result = await pool.query(
      "UPDATE users SET password=$1 WHERE email=$2 RETURNING email",
      [hash, email]
    );

    if (result.rowCount === 0) {
      console.log("No se encontró el usuario Jerry en la base.");
    } else {
      console.log("Contraseña actualizada para:", result.rows[0].email);
      console.log("Nueva contraseña:", newPassword);
    }

    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
})();
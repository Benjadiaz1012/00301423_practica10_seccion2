import { pool } from "../config/db.js";
import bcrypt from "bcrypt";

export const displayHome = (req, res) => {
  res.json({ message: "API funcionando correctamente (Guía 9)" });
};

export const getUsers = async (req, res) => {
  const result = await pool.query("SELECT id, email FROM users");
  res.json(result.rows);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT id, email FROM users WHERE id=$1", [
    id,
  ]);

  if (result.rowCount === 0)
    return res.status(404).json({ error: "Usuario no encontrado" });

  res.json(result.rows[0]);
};

export const createUser = async (req, res) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const result = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
    [email, hash]
  );

  res.json(result.rows[0]);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  const result = await pool.query(
    "UPDATE users SET email=$1 WHERE id=$2 RETURNING id, email",
    [email, id]
  );

  if (result.rowCount === 0)
    return res.status(404).json({ error: "Usuario no encontrado" });

  res.json(result.rows[0]);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    "DELETE FROM users WHERE id=$1 RETURNING id",
    [id]
  );

  if (result.rowCount === 0)
    return res.status(404).json({ error: "Usuario no encontrado" });

  res.json({ message: "Usuario eliminado" });
};

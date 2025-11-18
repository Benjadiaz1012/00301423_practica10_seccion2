import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { pool } from "./config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email FROM users ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hash]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const result = await pool.query(
      "UPDATE users SET name=$1, email=$2, password=$3 WHERE id=$4 RETURNING id, name, email",
      [name, email, hash, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM users WHERE id=$1", [id]);
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/signIn", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, "claveJWT", {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/customers", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customers ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/sales", async (req, res) => {
  const { amount, id_customer } = req.body;
  try {
    const exists = await pool.query("SELECT id FROM customers WHERE id=$1", [
      id_customer,
    ]);
    if (exists.rows.length === 0) {
      return res.status(400).json({ error: "Cliente no existe" });
    }
    const result = await pool.query(
      "INSERT INTO sales (amount, created_at, id_customer) VALUES ($1, NOW(), $2) RETURNING *",
      [amount, id_customer]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/sales", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT sales.id, sales.amount, sales.created_at,
             customers.name AS customer
      FROM sales
      JOIN customers ON sales.id_customer = customers.id
      ORDER BY sales.id ASC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/customers/search", async (req, res) => {
  const { code } = req.query;
  try {
    const result = await pool.query("SELECT * FROM customers WHERE code = $1", [
      code,
    ]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/sales/report", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT customers.name,
             SUM(sales.amount) AS total_sales
      FROM customers
      LEFT JOIN sales ON customers.id = sales.id_customer
      GROUP BY customers.name
      ORDER BY total_sales DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () =>
  console.log("Servidor corriendo en http://localhost:3000")
);

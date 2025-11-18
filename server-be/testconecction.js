import { pool } from './config/db.js';

try {
  const result = await pool.query('SELECT NOW()');
  console.log('Conexión exitosa:', result.rows[0]);
  process.exit(0);
} catch (err) {
  console.error('Error al conectar:', err.message);
  process.exit(1);
}
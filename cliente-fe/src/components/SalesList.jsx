import { useEffect, useState } from "react";
import axios from "axios";

export default function SalesList() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/sales")
      .then((res) => setSales(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Lista de Ventas</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Cliente</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>${s.amount}</td>
              <td>{new Date(s.created_at).toLocaleString()}</td>
              <td>{s.customer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

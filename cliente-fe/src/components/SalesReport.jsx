import { useEffect, useState } from "react";
import axios from "axios";

export default function SalesReport() {
  const [report, setReport] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/sales/report")
      .then((res) => setReport(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Reporte de Ventas por Cliente</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Total Ventas</th>
          </tr>
        </thead>
        <tbody>
          {report.map((r) => (
            <tr key={r.name}>
              <td>{r.name}</td>
              <td>${r.total_sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { useState } from "react";
import axios from "axios";

export default function CustomerSearch() {
  const [code, setCode] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    axios
      .get(`http://localhost:3000/api/customers/search?code=${code}`)
      .then((res) => setResults(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Buscar Cliente por Código</h2>

      <input
        type="text"
        placeholder="Código"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Código</th>
          </tr>
        </thead>
        <tbody>
          {results.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.address}</td>
              <td>{c.phone}</td>
              <td>{c.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

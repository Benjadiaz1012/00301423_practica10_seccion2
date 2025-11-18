import { useState } from "react";
import axios from "axios";

export default function RegisterSale() {
  const [amount, setAmount] = useState("");
  const [idCustomer, setIdCustomer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/api/sales", {
        amount,
        id_customer: idCustomer,
      })
      .then(() => alert("Venta registrada correctamente"))
      .catch((err) => alert("Error: " + err.response.data.error));
  };

  return (
    <div>
      <h2>Registrar Venta</h2>
      <form onSubmit={handleSubmit}>
        <label>Monto: </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <br />

        <label>ID Cliente: </label>
        <input
          type="number"
          value={idCustomer}
          onChange={(e) => setIdCustomer(e.target.value)}
        />
        <br />
        <br />

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

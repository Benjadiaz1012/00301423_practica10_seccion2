import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/register", { username, password });
    alert("Usuario registrado con éxito");
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Registro</h2>
      <input placeholder="Usuario" onChange={(e) => setU(e.target.value)} />
      <input type="password" placeholder="Contraseña" onChange={(e) => setP(e.target.value)} />
      <button type="submit">Registrar</button>
    </form>
  );
}
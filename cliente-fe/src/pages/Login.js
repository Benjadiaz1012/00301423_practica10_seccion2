import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/login", { username, password });
    localStorage.setItem("token", res.data.token);
    navigate("/profile");
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input placeholder="Usuario" onChange={(e) => setU(e.target.value)} />
      <input type="password" placeholder="Contraseña" onChange={(e) => setP(e.target.value)} />
      <button type="submit">Ingresar</button>
    </form>
  );
}
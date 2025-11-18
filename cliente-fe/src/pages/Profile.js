import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/profile", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setMessage(res.data.message));
  }, []);

  return <h2>{message}</h2>;
}

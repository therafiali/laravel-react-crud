import { useState } from "react";
import AuthService from "../../services/AuthService";


export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = () => {
    AuthService.login(form)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setMessage("Login successful!");
      })
      .catch(() => setMessage("Invalid credentials"));
  };

  return (
    <div className="flex flex-col w-3/4 p-8">
      <h2>Login</h2>

      <input name="email" placeholder="Email"
        value={form.email} onChange={handleChange} />

      <input name="password" type="password" placeholder="Password"
        value={form.password} onChange={handleChange} />

      <button onClick={handleLogin}>Login</button>

      {message && <p>{message}</p>}
    </div>
  );
}

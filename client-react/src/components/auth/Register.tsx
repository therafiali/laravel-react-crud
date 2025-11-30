import { useState } from "react";
import AuthService from "../../services/AuthService";


export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmed_password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = () => {
    AuthService.register(form)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setMessage("Account created!");
      })
      .catch((err) => setMessage("Registration failed"));
  };

  return (
    <div className="flex flex-col w-3/4 mx-auto p-8" >
      <h2>Register</h2>

      <input name="name" placeholder="Name"
        value={form.name} onChange={handleChange} />

      <input name="email" placeholder="Email"
        value={form.email} onChange={handleChange} />

      <input name="password" type="password" placeholder="Password"
        value={form.password} onChange={handleChange} />

      <input name="confirmed_password" type="password"
        placeholder="Confirm Password"
        value={form.confirmed_password} onChange={handleChange} />

      <button onClick={handleRegister}>Register</button>

      {message && <p>{message}</p>}
    </div>
  );
}

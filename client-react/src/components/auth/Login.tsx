import { useState } from "react";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
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
        if (res.data.error) {
          console.log(res.data.error);
           setMessage(res.data.error?.[0]);
          return
        }
        localStorage.setItem("token", res.data.token);
        setMessage("Login successful!");
        navigate("/");
      })
      .catch(() => setMessage("Invalid credentials"));
  };

  return (
    <div className="flex flex-col w-3/4 p-8">
      <h2>Login</h2>

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <button onClick={handleLogin}>Login</button>

      {message && <p>{message}</p>}
    </div>
  );
}

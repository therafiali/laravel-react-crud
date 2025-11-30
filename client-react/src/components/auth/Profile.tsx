import { useEffect, useState } from "react";
import AuthService from "../../services/AuthService";


export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    AuthService.getProfile().then((res) => {
      setForm({
        name: res.data.name,
        email: res.data.email,
        password: "",
      });
    });
  }, []);

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = () => {
    AuthService.updateProfile(form)
      .then(() => setMessage("Profile updated"))
      .catch(() => setMessage("Update failed"));
  };

  return (
    <div>
      <h2>Profile</h2>

      <input name="name" placeholder="Name"
        value={form.name} onChange={handleChange} />

      <input name="email" placeholder="Email"
        value={form.email} onChange={handleChange} />

      <input name="password" type="password" placeholder="New password"
        value={form.password} onChange={handleChange} />

      <button onClick={handleUpdate}>Save Changes</button>

      {message && <p>{message}</p>}
    </div>
  );
}

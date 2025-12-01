import { useEffect, useState } from "react";
import type { Post } from "../types/Post";
import postService from "../services/postService";
import AuthService from "../services/AuthService";
import LangChange from "./LangChange";
import InvoiceForm from "./InvoiceForm";

export default function Post() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  // Form state
  const [form, setForm] = useState<Omit<Post, "id">>({
    title: "",
    body: "",
  });

  const [editId, setEditId] = useState<number | null>(null);

  // Fetch All
  const loadPosts = () => {
    setLoading(true);
    postService
      .getAll()
      .then((res) => setPosts(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getCurrentUser();
    loadPosts();
  }, []);

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // CREATE
  const handleCreate = () => {
    postService.create(form).then(() => {
      loadPosts();
      setForm({ title: "", body: "" });
    });
  };

  // UPDATE
  const handleUpdate = () => {
    if (!editId) return;
    postService.update(editId, form).then(() => {
      loadPosts();
      setForm({ title: "", body: "" });
      setEditId(null);
    });
  };

  // DELETE
  const handleDelete = (id: number) => {
    postService.delete(id).then(() => loadPosts());
  };

  // GET BY ID (Auto fill form)
  const handleEdit = (id: number) => {
    postService.getById(id).then((res) => {
      setEditId(id);
      setForm({
        title: res.data.title,
        body: res.data.body,
      });
    });
  };

  const getCurrentUser = () => {
    AuthService.getMe().then((res) => {
      console.log(res.data[0].name);
      setName(res.data[0].name);
    });
  };

  if (loading) return <h3>Loading...</h3>;

  return (
    <div style={{ width: "600px", margin: "auto" }}>
      <h2>Welcome {name}</h2>
      <h2>Post CRUD</h2>

      <LangChange />

      {/* FORM */}
      <div style={{ marginBottom: 20, padding: 15, border: "1px solid #aaa" }}>
        <h3>{editId ? "Update Post" : "Create Post"}</h3>

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <textarea
          name="body"
          placeholder="Body"
          value={form.body}
          onChange={handleChange}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        {editId ? (
          <>
            <button
              onClick={handleUpdate}
              style={{ padding: "8px 15px", marginRight: 10 }}
            >
              Update
            </button>
            <button
              onClick={() => {
                setEditId(null);
                setForm({ title: "", body: "" });
              }}
              style={{ padding: "8px 15px" }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button onClick={handleCreate} style={{ padding: "8px 15px" }}>
            Add Post
          </button>
        )}
      </div>

      {/* LIST */}
      {posts.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,
          }}
        >
          <h3>{p.title}</h3>
          <p>{p.body}</p>

          <button onClick={() => handleEdit(p.id)} style={{ marginRight: 10 }}>
            Edit
          </button>

          <button
            onClick={() => handleDelete(p.id)}
            style={{ background: "red", color: "white" }}
          >
            Delete
          </button>
        </div>
      ))}

      <InvoiceForm />
    </div>
  );
}

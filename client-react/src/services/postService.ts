import api from "../api/axios";
import type { Post } from "../types/Post";

class PostService {
  getAll() {
    return api.get<Post[]>("/post");
  }

  getById(id: number) {
    return api.get<Post>(`/post/${id}`);
  }

  create(data: Omit<Post, "id">) {
    return api.post<Post>("/post", data);
  }

  update(id: number, data: Partial<Post>) {
    return api.put<Post>(`/post/${id}`, data);
  }

  delete(id: number) {
    return api.delete(`/post/${id}`);
  }
}

export default new PostService();

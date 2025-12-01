import api from "../api/axios";


interface RegisterInput {
  name: string;
  email: string;
  password: string;
  confirmed_password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface ProfileInput {
  name: string;
  email: string;
  password?: string;
}

class AuthService {
  register(data: RegisterInput) {
    return api.post("/register", data);
  }

  login(data: LoginInput) {
    return api.post("/login", data);
  }

  getProfile() {
    return api.get("/profile");
  }

  updateProfile(data: ProfileInput) {
    return api.post("/profile", data);
  }

  getMe (){
    return api.get("/me")
  }
}

export default new AuthService();

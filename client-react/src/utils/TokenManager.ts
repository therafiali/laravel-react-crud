export const TokenManager = {
  getToken: () => localStorage.getItem("auth_token"),
  setToken: (token: string) => localStorage.setItem("auth_token", token),
  removeToken: () => localStorage.removeItem("auth_token"),
  hasToken: () => !!localStorage.getItem("auth_token"),
};

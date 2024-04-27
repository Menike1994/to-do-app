import { jwtDecode } from "jwt-decode";

export interface User {
  email: string;
  userId: number;
}

export const useAuth = () => {
  const token = localStorage.getItem("token");
  const auth: boolean = !!token;
  const user: User | null = token ? jwtDecode(token) : null;
  return { auth, user, token, setToken, signOut };
};

export enum TokenType {
  API = "token",
}

const setToken = (tokenType: TokenType, token: string) => {
  localStorage.setItem(tokenType, token);
};

const signOut = () => {
  localStorage.removeItem("token");
};

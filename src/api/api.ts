import axios from "axios";

export const AuthInstance = axios.create({
  baseURL: import.meta.env.VITE_Naming,
});

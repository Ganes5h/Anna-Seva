import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  const decoded = jwtDecode(token);
  return decoded.exp * 1000 < Date.now();
};

import { useAuth } from "./useAuth";

export const useAuthHeader = () => {
  const { auth, token } = useAuth();
  const authorizationHeader = auth
    ? { Authorization: `Bearer ${token}` }
    : { Authorization: "" };

  return authorizationHeader;
};

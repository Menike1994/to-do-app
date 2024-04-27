import React, { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

type ProtectedProps = {
  children: ReactNode;
};

export const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const { auth } = useAuth();

  if (auth) {
    return children;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

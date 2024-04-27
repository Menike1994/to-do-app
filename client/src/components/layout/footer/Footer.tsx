import { Layout } from "antd";
import React from "react";

export const Footer: React.FC = () => {
  const { Footer } = Layout;
  return (
    <Footer style={{ textAlign: "center" }}>
      ToDoApp ©{new Date().getFullYear()} ToDoApp LLC. All rights reserved.
    </Footer>
  );
};

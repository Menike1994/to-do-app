import { Layout } from "antd";
import React, { ReactNode } from "react";
import { Content } from "antd/es/layout/layout";
import styles from "./DefaultLayout.module.scss";
import { Footer } from "./footer/Footer";
import { NavBar } from "./navbar/NavBar";

export const DefaultLayout: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <>
      <Layout className={styles.layout}>
        <NavBar />
        <Content className="grid w-full content-start">{children}</Content>
        <Footer />
      </Layout>
    </>
  );
};

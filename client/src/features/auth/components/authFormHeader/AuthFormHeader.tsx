import { Row, Image } from "antd";
import React from "react";
import Logo from "../../../../assets/Logo.webp";

type AuthFormHeaderProps = {
  heading: string;
  subHeading: string;
};

const AuthFormHeader: React.FC<AuthFormHeaderProps> = ({
  heading,
  subHeading,
}) => {
  return (
    <>
      <Row>
        <Image src={Logo} preview={false} width={150} />
      </Row>
      <Row>
        <h1 style={{ marginBottom: "10px" }}>{heading}</h1>
      </Row>
      <Row>
        <p style={{ margin: 0, marginBottom: "10px" }}>{subHeading}</p>
      </Row>
    </>
  );
};

export default AuthFormHeader;

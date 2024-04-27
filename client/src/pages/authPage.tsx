import { Col, Row } from "antd";
import React from "react";
import SignInForm from "../features/auth/components/forms/signInForm/SignInForm";
import SignUpForm from "../features/auth/components/forms/signUpForm/SignUpForm";

type AuthPageProps = {
  isSignIn: boolean;
};

const AuthPage: React.FC<AuthPageProps> = ({ isSignIn }) => {
  return (
    <>
      <div className="content-center" style={{ minHeight: "100vh" }}>
        <Row justify={"center"} align={"middle"} className="">
          {!isSignIn && (
            <>
              <Col span={24}>
                <div className="grid">
                  <SignUpForm />
                </div>
              </Col>
            </>
          )}

          {isSignIn && (
            <>
              <Col span={24}>
                <div className="grid">
                  <SignInForm />
                </div>
              </Col>
            </>
          )}
        </Row>
      </div>
    </>
  );
};

export default AuthPage;

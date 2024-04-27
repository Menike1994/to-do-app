import { Input, Form, Button, Alert, Col, Row } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../AuthApi";
import { TokenType, useAuth } from "../../../../../hooks/useAuth";
import styles from "../AuthFrom.module.scss";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import AuthFormHeader from "../../authFormHeader/AuthFormHeader";
import { ERRORS } from "../../../../../consts/ERRORS";

const SignInForm: React.FC = () => {
  const [form] = Form.useForm();
  const { auth, setToken } = useAuth();

  const [
    login,
    {
      data: loginResult,
      isLoading: isLoginLoading,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginMutation();

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  });

  useEffect(() => {
    if (isLoginSuccess && loginResult) {
      setToken(TokenType.API, loginResult.token);
      navigate("/");
    }
  }, [isLoginSuccess, loginResult]);

  const navigate = useNavigate();

  const onSubmit = async () => {
    const email = form.getFieldValue("email");
    const password = form.getFieldValue("password");
    const loginInput = { email, password };
    console.log("login input ==> ", loginInput);
    login(loginInput);
  };

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, []);

  const getEror = (error: any): string => {
    console.log("error ==> ", error);
    if (error.error.code == ERRORS.INVALID_CREDENTIALS) {
      return "Incorrect Email or Password";
    }
    return "Something Went Wrong. Please Contact Site Admin";
  };

  return (
    <>
      <div className={styles.formContainer}>
        <AuthFormHeader
          heading={"Log in to your Account"}
          subHeading={"Welcome Back!"}
        />
        <Form
          form={form}
          name="control-hooks"
          onFinish={onSubmit}
          className={styles.signInForm}
        >
          {isLoginError && (
            <Alert
              message={getEror(loginError)}
              type="error"
              showIcon
              closable
              className={styles.alertBanner}
            />
          )}

          <Form.Item
            name="email"
            rules={[
              { required: true },
              { type: "email", message: "Email not valid" },
            ]}
          >
            <Input
              className={styles.inputs}
              type="email"
              placeholder="Enter Your Email"
              prefix={<AiOutlineMail size={18} />}
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true }]}>
            <Input
              className={styles.inputs}
              type="password"
              placeholder="Enter Your Password"
              prefix={<AiOutlineLock size={18} />}
            />
          </Form.Item>
          <Row style={{ marginBottom: "20px" }}>
            <Col span={1} style={{ display: "flex", alignContent: "center" }}>
              <Input type="checkbox" />
            </Col>
            <Col span={11} style={{ paddingLeft: "5px" }}>
              Remember me
            </Col>
            <Col span={12} className={styles.forgotPWD}>
              <a>Forgot Password?</a>
            </Col>
          </Row>
          <Form.Item>
            <Button
              className={`themeButton ${styles.loginBtn}`}
              type="primary"
              htmlType="submit"
              loading={isLoginLoading}
            >
              Log in
            </Button>
          </Form.Item>
          <p>
            Don't have an account?
            <Link to={"/register"}> Create an account</Link>
          </p>
        </Form>
      </div>
    </>
  );
};

export default SignInForm;

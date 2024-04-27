import { Alert, Input, Button, Row, Col, Form } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TokenType, useAuth } from "../../../../../hooks/useAuth";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import AuthFormHeader from "../../authFormHeader/AuthFormHeader";
import styles from "../AuthFrom.module.scss";
import { useRegisterMutation } from "../../../AuthApi";
import { ERRORS } from "../../../../../consts/ERRORS";

const SignUpForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { auth, setToken } = useAuth();

  const [
    register,
    {
      data: registerResult,
      isLoading: isRegisterLoading,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterMutation();

  const onSubmit = async () => {
    const email = form.getFieldValue("email");
    const password = form.getFieldValue("password");
    const signUpInput = { email, password };
    console.log("signup input ==> ", signUpInput);
    register(signUpInput);
  };

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (isRegisterSuccess && registerResult) {
      setToken(TokenType.API, registerResult.token);
      navigate("/");
    }
  }, [isRegisterSuccess, registerResult]);

  const getEror = (error: any): string => {
    console.log("error ==> ", error);
    if (error.error.code == ERRORS.USER_ALREADY_EXIST) {
      return "User Already Exist Please Login";
    } else {
      return "Something Went Wrong. Please Contact Site Admin";
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <AuthFormHeader heading={"Create an Account"} subHeading={"Welcome!"} />
        <Form
          form={form}
          name="control-hooks"
          onFinish={onSubmit}
          className={styles.signInForm}
        >
          {isRegisterError && (
            <Alert
              message={getEror(registerError)}
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
              placeholder="Enter New Password"
              prefix={<AiOutlineLock size={18} />}
            />
          </Form.Item>
          <Row>
            <Col span={23} style={{ paddingLeft: "5px", marginBottom: "10px" }}>
              By creating an account, you agree to our{" "}
              <Link to={"./"}>Terms</Link> and have read and acknowledge the{" "}
              <Link to={"./"}>Privacy policy statment</Link>
            </Col>
          </Row>
          <Form.Item>
            <Button
              className={`themeButton ${styles.loginBtn}`}
              type="primary"
              htmlType="submit"
              loading={isRegisterLoading}
            >
              Sign up
            </Button>
          </Form.Item>
          <p>
            Already have an account?
            <Link to={"/login"}> Log in</Link>
          </p>
        </Form>
      </div>
    </>
  );
};

export default SignUpForm;

import { Button, Col, Image, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Logo from "../../../assets/Logo.webp";

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    navigate("/login");
  };

  return (
    <>
      <Row className="p-6 mx-10" justify={"space-between"}>
        <Col span={4} className="content-center justify-start">
          <Image
            src={Logo}
            width={100}
            preview={false}
            onClick={() => {
              navigate("/");
            }}
          />
        </Col>
        <Col span={4} className="content-center flex flex-wrap justify-end">
          <Button onClick={handleSignOut}>Sign Out</Button>
        </Col>
      </Row>
    </>
  );
};

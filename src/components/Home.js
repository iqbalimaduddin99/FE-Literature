import { Col, Row } from "react-bootstrap";
import picHome from "../assets/2997 1.png";
import { useState } from "react";
import ModalLogin from "./atoms/ModalLogin";
import ModalRegister from "./atoms/ModalRegister";

function Home() {
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const ShowLogin = () => {
    setShowLogin(true);
    setShow(false);
  };
  const ShowRegister = () => {
    setShowLogin(false);
    setShow(true);
  };

  return (
    <Row className="homePage">
      <ModalLogin
        ShowRegister={ShowRegister}
        handleClose={handleCloseLogin}
        show={showLogin}
      />
      <ModalRegister
        handleShowLogin={ShowLogin}
        handleClose={handleClose}
        show={show}
      />
      <Col className="leftHome" sm={5}>
        <p className="homeText">source of intelligence </p>
        <p className="textText">
          Sign-up and receive unlimited accesss to all of your literatur - share
          your literature.
        </p>
        <button className="buttonSignUp" onClick={handleShow}>
          Sign Up
        </button>
        <button className="buttonSignIn" onClick={handleShowLogin}>
          Sign In
        </button>
      </Col>

      <Col className="rightHome" sm={7}>
        <img alt="picHome" src={picHome} />
      </Col>
    </Row>
  );
}

export default Home;

import { useContext, useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { API, setAuthToken } from "../../config/api";
import { AppContext } from "../../context/AppContext";

function ModalLogin({ ShowRegister, handleClose, show }) {
  const [, dispatch] = useContext(AppContext);
  const [alert, setAlert] = useState();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { "Content-type": "application/json" } };

      const body = JSON.stringify(input);
      const response = await API.post("/login", body, config);
      console.log(response);
      setAuthToken(response?.data.user.token);
      dispatch({
        type: "login_success",
        payload: { ...response?.data.user, token: response.data.token },
      });
      response.data.user.status === "admin"
        ? navigate("/manage-literature")
        : navigate("/home");
    } catch (error) {
      console.log(error.response);
      console.log(error.response?.data.message === alert);
      if (alert === error.response?.data.message) {
        setAlert("");
        setTimeout(() => setAlert(error.response?.data.message), 50);
      } else {
        setAlert(error.response?.data.message);
      }
    }
  };
  return (
    show && (
      <div>
        <div className="overlay" onClick={handleClose} />
        <div className="modal-content">
          <Form onSubmit={handleSubmit}>
            <p className="modal-titel">Sign In</p>{" "}
            {alert && (
              <Alert
                style={{ marginBottom: "30px", marginTop: "60px" }}
                variant="danger"
              >
                {alert}
              </Alert>
            )}
            <input
              className="inputmodal"
              placeholder="Email"
              onChange={handleChange}
              name="email"
              value={input.email}
            />
            <input
              type="password"
              className="inputmodal"
              placeholder="Password"
              onChange={handleChange}
              name="password"
              value={input.password}
            />
            <button type="submit" className="buttonmodal">
              Sign In
            </button>
            <p className="modal-foot">
              Don't have an account ? Klik{" "}
              <span onClick={ShowRegister} className="heretext">
                Here
              </span>
            </p>
          </Form>
        </div>
      </div>
    )
  );
}

export default ModalLogin;

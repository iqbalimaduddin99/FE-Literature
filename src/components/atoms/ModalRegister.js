import { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { API } from "../../config/api";
function ModalRegister({ handleShowLogin, handleClose, show }) {
  const [alert, setAlert] = useState();
  const [input, setInput] = useState({
    email: "",
    password: "",
    gender: "",
    phone: "",
    address: "",
    fullName: "",
  });

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

      const response = await API.post("/register", body, config);
      console.log(response);
      setAlert(response.data.message);
    } catch (error) {
      if (alert === error.response.data.message) {
        setAlert("");
        setTimeout(() => setAlert(error.response.data.message), 50);
      } else {
        setAlert(error.response.data.message);
      }
    }
  };

  return (
    show && (
      <div>
        <div className="overlay" onClick={handleClose} />
        <div className="modal-content-register">
          <Form onSubmit={handleSubmit}>
            <p className="modal-titel">Sign Up</p>
            {alert &&
              (alert === "Registered Succesfully" ? (
                <Alert
                  style={{ marginBottom: "30px", marginTop: "60px" }}
                  variant="success"
                >
                  {alert}
                </Alert>
              ) : (
                <Alert
                  style={{ marginBottom: "30px", marginTop: "60px" }}
                  variant="danger"
                >
                  {alert}
                </Alert>
              ))}
            <input
              className="inputmodal"
              placeholder="Full Name"
              onChange={handleChange}
              name="fullName"
              value={input.fullName}
            />
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
            <input
              className="inputmodal"
              placeholder="Gender"
              onChange={handleChange}
              name="gender"
              value={input.gender}
            />
            <input
              className="inputmodal"
              placeholder="Phone"
              onChange={handleChange}
              name="phone"
              value={input.phone}
            />
            <input
              className="inputmodal"
              placeholder="Address"
              onChange={handleChange}
              name="address"
              value={input.address}
            />
            <button type="submit" className="buttonmodal">
              Sign In
            </button>
            <p className="modal-foot">
              Don't have an account ? Klik{" "}
              <span onClick={handleShowLogin} className="heretext">
                Here
              </span>
            </p>
          </Form>
        </div>
      </div>
    )
  );
}

export default ModalRegister;

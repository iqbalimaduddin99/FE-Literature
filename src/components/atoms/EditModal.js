import { useContext, useState } from "react";
import { Col, Row, Form, FormControl } from "react-bootstrap";
import { API } from "../../config/api";
import {
  faPhoneAlt,
  faEnvelope,
  faMapMarkerAlt,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../context/AppContext";

function ModalEdit({ show, setShow }) {
  const [input, setInput] = useState({
    gender: "",
    email: "",
    phone: "",
    address: "",
    imageFile: [],
  });
  const [preview, setPreview] = useState();
  const [state, dispatch] = useContext(AppContext);

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      if (input.gender !== "") {
        formData.set("gender", input?.gender);
      }
      if (input.email !== "") {
        formData.set("email", input?.email);
      }
      if (input.phone !== "") {
        formData.set("phone", input?.phone);
      }
      if (input.address !== "") {
        formData.set("address", input?.address);
      }
      if (input?.imageFile?.length > 0) {
        formData.set("image", input?.imageFile[0]);
      }
      const response = await API.patch("/user", formData, config);

      dispatch({
        type: "update",
      });
      setInput({
        gender: "",
        email: "",
        phone: "",
        address: "",
      });
      setPreview();
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onHide = () => {
    setShow(false);
  };

  return (
    show && (
      <div>
        <div onClick={onHide} className="overlay" />
        <Form onSubmit={handleEdit} className="modalEdit">
          <Row style={{ margin: "20px 30px 30px 50px " }}>
            <Col lg={7}>
              <div>
                <p style={{ margin: "10px 0px 30px" }} className="textBoldEdit">
                  Edit Profile
                </p>
                <div style={{ display: "flex" }}>
                  <div style={{ paddingTop: "16px", width: "65px" }}>
                    {" "}
                    <FontAwesomeIcon
                      className="picProfile"
                      alt="pic"
                      icon={faEnvelope}
                    />
                  </div>
                  <div style={{ marginLeft: "20px" }}>
                    <p className="WhitetextEdit">Email</p>
                    <FormControl
                      type="text"
                      name="email"
                      className="edit-profeil-input"
                      value={input.email}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", marginTop: "15px" }}>
                  <div style={{ paddingTop: "43px", width: "65px" }}>
                    <FontAwesomeIcon
                      className="picProfile"
                      alt="pic"
                      icon={faVenusMars}
                    />
                  </div>
                  <div style={{ marginLeft: "20px", marginTop: "30px" }}>
                    <p className="WhitetextEdit">Gender</p>
                    <FormControl
                      type="text"
                      name="gender"
                      className="edit-profeil-input"
                      value={input.gender}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", marginTop: "15px" }}>
                  <div style={{ paddingTop: "41px", width: "65px" }}>
                    <FontAwesomeIcon className="picProfile" icon={faPhoneAlt} />
                  </div>
                  <div style={{ marginLeft: "20px", marginTop: "30px" }}>
                    <p className="WhitetextEdit">Phone</p>
                    <FormControl
                      type="text"
                      name="phone"
                      className="edit-profeil-input"
                      value={input.phone}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", marginTop: "15px" }}>
                  <div style={{ paddingTop: "41px", width: "65px" }}>
                    <FontAwesomeIcon
                      className="picProfile"
                      icon={faMapMarkerAlt}
                    />
                  </div>
                  <div style={{ marginLeft: "20px", marginTop: "30px" }}>
                    <p className="WhitetextEdit">Address</p>
                    <FormControl
                      name="address"
                      className="edit-profeil-input"
                      value={input.address}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col style={{ justifyContent: "flex-start" }} lg={5}>
              <label>
                {preview ? (
                  <div className="image-edit-profile">
                    <img
                      src={preview}
                      alt="receipt"
                      className="image-edit-profilefile"
                    />
                  </div>
                ) : (
                  <div className="profile-edit">
                    <FontAwesomeIcon
                      className="image-edit"
                      icon={faFileImage}
                    />
                    <p style={{fontWeight:'600', marginTop:'9px'}}>Upload image profile here</p>
                  </div>
                )}
                <input
                  type="file"
                  name="imageFile"
                  onChange={onChange}
                  accept=".jpg,.jpeg,.png,.svg"
                  hidden
                />
              </label>
            </Col>
          </Row>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit" className="btn-edit">
              Submit
            </button>
          </div>
        </Form>
      </div>
    )
  );
}

export default ModalEdit;

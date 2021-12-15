import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faEnvelope,
  faMapMarkerAlt,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import { AppContext } from "../context/AppContext";
import { API } from "../config/api";
import { useContext, useEffect, useState } from "react";
import ModalEdit from "./atoms/EditModal";
import User from "../assets/User.png";
import { PDFReader } from "react-read-pdf";
import { useNavigate } from "react-router";
import moment from "moment";

function Profile() {
  const [profileData, setProfileData] = useState();
  const [data, setData] = useState();
  const [state] = useContext(AppContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const clickDetail = (id) => {
    navigate(`/literature/${id}`);
  };
  const fileNew = async () => {
    const response = await API.get(`/literature-created`);
    console.log(response);
    setData(response.data.data);
  };

  useEffect(() => {
    fileNew();
  }, []);
  const getData = async () => {
    try {
      const response = await API.get("/user");
      console.log(response);
      setProfileData(response.data.user);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getData();
  }, [state.updating]);

  const showModal = () => {
    setShow(true);
  };
  const path = "http://localhost:5000/uploads/image/";
  const pathFile = "http://localhost:5000/uploads/document/";
  return (
    <div className="homeProfile">
      <p className="textBoldUp">Profile</p>
      <ModalEdit show={show} setShow={setShow} />
      <div className="centercontent">
        <Card className="cardcontent">
          <div className="divcard">
            <div style={{ marginTop: "40px", marginLeft: "50px" }}>
              <div style={{ display: "flex", marginBottom: "13px" }}>
                <div style={{ paddingTop: "21px", width: "65px" }}>
                  <FontAwesomeIcon
                    className="picProfile"
                    alt="pic"
                    icon={faEnvelope}
                  />
                </div>
                <div style={{ marginLeft: "25px" }}>
                  {profileData?.email !== "" ? (
                    <p className="Redtext">{profileData?.email}</p>
                  ) : (
                    <p className="Redtext">-</p>
                  )}
                  <p className="Whitetext">Email</p>
                </div>
              </div>
              <div style={{ display: "flex", marginBottom: "13px" }}>
                <div style={{ paddingTop: "23px", width: "65px" }}>
                  <FontAwesomeIcon
                    className="picProfile"
                    alt="pic"
                    icon={faVenusMars}
                  />
                </div>
                <div style={{ marginLeft: "25px" }}>
                  {profileData?.gender !== "" ? (
                    <p className="Redtext">{profileData?.gender}</p>
                  ) : (
                    <p className="Redtext">-</p>
                  )}
                  <p className="Whitetext">Gender</p>
                </div>
              </div>
              <div style={{ display: "flex", marginBottom: "13px" }}>
                <div style={{ paddingTop: "17px", width: "65px" }}>
                  <FontAwesomeIcon className="picProfile" icon={faPhoneAlt} />
                </div>
                <div style={{ marginLeft: "25px" }}>
                  {profileData?.phone !== "" ? (
                    <p className="Redtext">{profileData?.phone}</p>
                  ) : (
                    <p className="Redtext">-</p>
                  )}
                  <p className="Whitetext">Phone</p>
                </div>
              </div>
              <div style={{ display: "flex", marginBottom: "13px" }}>
                <div style={{ paddingTop: "17px", width: "65px" }}>
                  <FontAwesomeIcon
                    className="picProfile"
                    icon={faMapMarkerAlt}
                  />
                </div>
                <div style={{ marginLeft: "25px" }}>
                  {profileData?.address !== "" ? (
                    <p className="Redtext">{profileData?.address}</p>
                  ) : (
                    <p className="Redtext">-</p>
                  )}
                  <p className="Whitetext">Address</p>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "40px", marginRight: "50px" }}>
              <div>
                {profileData?.image === null ? (
                  <img alt="" className="img-profile" src={User} />
                ) : (
                  <img
                    alt=""
                    className="img-profile"
                    src={path + profileData?.image}
                  />
                )}
              </div>
              <button onClick={showModal} className="buttonProfile">
                Edit profile
              </button>
            </div>
          </div>
        </Card>
      </div>
      <p className="textBoldProfie">My Literature</p>
      <div className="colrightCollect">
        {data?.map((x) => {
          return (
            <Card
              onClick={() => {
                clickDetail(x.id);
              }}
              className="cardinvisibleProfiel"
            >    {(() => {
              if (x.action === "Cancel") {
                return (
                  <p style={{ color: "white", fontWeight: "500" }}>
                    Status :{" "}
                    <span className="status-list-cancel">{x.action}</span>
                  </p>
                );
              } else if (x.action === "Waiting to be verified") {
                return (
                  <p style={{ color: "white", fontWeight: "500" }}>
                    Status : <span className="status-list">Waiting approve</span>
                  </p>
                );
              } else if (x.action === "Approve") {
                return (
                  <p style={{ color: "white", fontWeight: "500" }}>
                    Status :{" "}
                    <span className="status-list-approve">Approved</span>
                  </p>
                );
              }
            })()}
              <PDFReader url={pathFile + x.attache} width="200" page={1} />
              <div>
                
                <p className="textBoldCard">{x.title} </p>
                <div className="textCard">
                  <p className="textBoldyear">{x.author} </p>
                  <p className="textBoldautorh">
                    {moment(x.publication_date).format("YYYY")}{" "}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;

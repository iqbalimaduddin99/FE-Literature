import { useContext, useEffect, useState } from "react";
import { API } from "../config/api";
import { Table } from "react-bootstrap";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import ManageModal from "./atoms/ModalManage";
import ModalWaiting from "./atoms/ModalWaiting";
import ModalCancel from "./atoms/ModalCancel";


function ListManage() {
  const [state, dispatch] = useContext(AppContext);
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [idModal, setId] = useState();
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const response = await API.get("/literature");
      console.log(response);
      setData(response.data.literature);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getData();
  }, [state.updating]);

  const handleModal = (id) => {
    setShow(true);
    setId(id);
    dispatch({
      type: "update",
    });
  };
  const handleCancel = (id) => {
    setShowModalCancel(true);
    setId(id);
    dispatch({
      type: "update",
    });
  };
  const handleWaiting = (id) => {
    setShowModal(true);
    setId(id);
    dispatch({
      type: "update",
    });
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const closeModalCancel= () => {
    setShowModalCancel(false);
  };
  return (
    <div className="ManageLit">
      <p className="textBoldAdmin">Book verification</p>
      <div
        style={{
          margin: "40px 0px 30px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Table>
          <thead>
            <tr
              style={{
                background: "white",
                height: "60px",
                verticalAlign: "middle",
              }}
            >
              <th>No</th>
              <th>User or Author</th>
              <th>ISBN</th>
              <th>Literature</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <>
                  <tr
                    style={{
                      background: "white",
                      height: "60px",
                      verticalAlign: "middle",
                    }}
                  >
                    <td style={{ width: "50px" }}>{index + 1}</td>

                    <td style={{ fontWeight: "500" }}>{item.author}</td>
                    <td style={{ fontWeight: "500" }}>{item.ISBN}</td>
                    <td>
                      <p
                        className="clickclik"
                        onClick={() => {
                          navigate(`/literature/${item.id}`);
                        }}
                      >
                        {item.title}
                      </p>
                    </td>
                    {(() => {
                      if (item.action === "Cancel") {
                        return (
                          <td className="status-list-cancel">{item.action}</td>
                        );
                      } else if (item.action === "Waiting to be verified") {
                        return <td className="status-list">{item.action}</td>;
                      } else if (item.action === "Approve") {
                        return (
                          <td className="status-list-approve">{item.action}</td>
                        );
                      }
                    })()}
                    {(() => {
                      if (item.action === "Cancel") {
                        return (
                          <td
                            onClick={() => {
                              handleModal(item.id);
                            }}
                          >
                            <FontAwesomeIcon
                              style={{
                                color: "red",
                                fontSize: "20px",
                                cursor: "pointer",
                              }}
                              icon={faTimesCircle}
                            />
                          </td>
                        );
                      } else if (item.action === "Approve") {
                        return (
                          <td
                            onClick={() => {
                              handleModal(item.id);
                            }}
                          >
                            <FontAwesomeIcon
                              style={{
                                color: "green",
                                fontSize: "20px",
                                cursor: "pointer",
                              }}
                              icon={faCheckCircle}
                            />
                          </td>
                        );
                      } else {
                        return (
                          <td style={{
                            width: "10px"}}>
                            <tr
                              style={{
                                background: "white",
                                height: "60px",
                                verticalAlign: "middle",
                              }}
                            >
                              <td
                              onClick={() => {
                                handleWaiting(item.id);
                              }}
                              >
                                {" "}
                                <button className="buttonApprove">
                                  Approve
                                </button>
                              </td>
                              <td
                              onClick={() => {
                                handleCancel(item.id);
                              }}
                              >
                                <button className="buttonCancel">Cancel</button>
                              </td>
                            </tr>
                          </td>
                        );
                      }
                    })()}
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
        <ManageModal
          show={show}
          handleClose={handleClose}
          idModal={idModal}
          setShow={setShow}
        />
        <ModalWaiting
          show={showModal}
          handleClose={handleCloseModal}
          idModal={idModal}
          setShow={setShowModal}
        />
        <ModalCancel
          show={showModalCancel}
          handleClose={closeModalCancel}
          idModal={idModal}
          setShow={setShowModalCancel}/>
      </div>
    </div>
  );
}

export default ListManage;

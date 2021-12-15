import { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { API } from "../../config/api";
import { AppContext } from "../../context/AppContext";

function ManageModal({ show, handleClose, idModal, setShow }) {
  const [state, dispatch] = useContext(AppContext);
  const [data, setData] = useState();
  const getData = async () => {
    try {
      const response = await API.get(`/literature/${idModal}`);
      console.log(response);
      setData(response.data.literature);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleApprove = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify({ action: "Approve" });
      const response = await API.patch(`literature/${idModal}`, body, config);
      console.log(response);
      dispatch({
        type: "update",
      });
      setShow(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleCancel = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify({ action: "Cancel" });
      const response = await API.patch(`literature/${idModal}`, body, config);
      dispatch({
        type: "update",
      });
      setShow(false);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, [state.updating]);

  return (
    <div>
      {(() => {
        if (data?.action === "Approve") {
          return (
            <Modal show={show} onHide={handleClose} centered>
              <p>Do you want to Cancel this literature?</p>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  style={{
                    backgroundColor: "red",
                    border: "none",
                    marginRight: "10px",
                  }}
                  onClick={handleClose}
                >
                  No
                </Button>
                <Button
                  style={{ backgroundColor: "#0acf83", border: "none" }}
                  onClick={handleCancel}
                >
                  Yes
                </Button>
              </div>
            </Modal>
          );
        } else if (data?.action === "Cancel") {
          return (
            <Modal show={show} onHide={handleClose} centered>
              <p>Do you want to Approve this literature?</p>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  style={{
                    backgroundColor: "red",
                    border: "none",
                    marginRight: "10px",
                  }}
                  onClick={handleClose}
                >
                  No
                </Button>
                <Button
                  style={{ backgroundColor: "#0acf83", border: "none" }}
                  onClick={handleApprove}
                >
                  Yes
                </Button>
              </div>
            </Modal>
          );
        } else if (data?.action === "Waiting to be verified") {
          return (
            <Modal show={show} onHide={handleClose} centered>
              <p>choose your decision, Approve or Cancel literature</p>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  style={{
                    backgroundColor: "red",
                    border: "none",
                    marginRight: "10px",
                  }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  style={{ backgroundColor: "#0acf83", border: "none" }}
                  onClick={handleApprove}
                >
                  Approve
                </Button>
              </div>
            </Modal>
          );
        }
      })()}
    </div>
  );
}

export default ManageModal;

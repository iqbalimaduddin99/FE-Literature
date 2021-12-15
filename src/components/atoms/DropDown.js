import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import polygon from "../../assets/Polygon 1.png";
import logout from "../../assets/logout 1.png";

function DropdownComponent({ showDropDown, setShowDropDown }) {
  const onHide = () => {
    setShowDropDown(false);
  };
  const navigate = useNavigate();

  return (
    showDropDown && (
      <div>
        <div>
          <div onClick={onHide} className="dd-overlay" />
          <img alt="" className="polygon" src={polygon} />
          <div className="dd-modal">
            <Dropdown.Item
              style={{
                fontWeight: "bold",
                marginTop: "10px",
                marginBottom: "10px",
              }}
              onClick={() => navigate("/logout")}
            >
              <img alt="" style={{ marginRight: "7px" }} src={logout} />
              Logout
            </Dropdown.Item>
          </div>
        </div>
      </div>
    )
  );
}

export default DropdownComponent;

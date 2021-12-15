import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import logo from "../assets/Group 4.png";
import { AppContext } from "../context/AppContext";
import Avatar from "react-avatar";
import DropdownComponent from "./atoms/DropDown";

function Navbar() {
  const [state] = useContext(AppContext);
  const [showDropDown, setShowDropDown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const onClickDropDown = () => setShowDropDown(true);
  const path = "http://localhost:5000/uploads/image/";
  return (
    <div>
      {(() => {
        if (state.isLogin === false) {
          return (
            <div className="nav">
              <img alt="logo" className="logo" src={logo} />
              <></>
            </div>
          );
        } else if (state.isLogin === true && state.user.status !== "admin") {
          return (
            <div className="nav">
              <div className="nav-beetwen">
              {location.pathname === '/home' || location.pathname === '/search-result' ?
                <p onClick={() => {navigate("/home")}} className="textNavBarRed" >Home</p> :
                <p onClick={() => {navigate("/home")}} className="textNavBar" >Home</p>
                }
                {location.pathname === '/profile' ? <p
                  className="textNavBarRed"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Profile
                </p> : <p className="textNavBar"onClick={() => {navigate("/profile")}}>Profile</p>}
                {location.pathname === '/my-collection' ?
                <p onClick={() => {navigate("/my-collection")}} className="textNavBarRed" >My Collection</p> :
                <p onClick={() => {navigate("/my-collection")}} className="textNavBar" >My Collection</p>
                }
                {location.pathname === '/add-literature' ?
                <p onClick={() => {navigate("/add-literature")}} className="textNavBarRed" >Add Literature</p> :
                <p onClick={() => {navigate("/add-literature")}} className="textNavBar" >Add Literature</p>
                }
                <p onClick={() => {navigate("/logout")}} className="textNavBar">Logout</p>
              </div>
              <div>
                <img alt="logo" className="logo-right" src={logo} />
              </div>
            </div>
          );
        } else if (state.isLogin === true && state.user.status === "admin") {
          return (
            <>
            <DropdownComponent
            showDropDown={showDropDown}
            setShowDropDown={setShowDropDown}
          />
            <div className="nav">
              <div>
                <img alt="logo" className="navlogo" src={logo} />
              </div>
              <section onClick={onClickDropDown}>
                  {state?.user?.image !== '' ? (
                    <img
                    alt='picture'
                      src={path + state?.user?.image}
                      onClick={onClickDropDown}
                      className="icon-profile"
                    />
                  ) : (
                    <Avatar
                      onClick={onClickDropDown}
                      className="icon-profile-avatar"
                      name={state?.user?.fullName}
                    />
                  )}
                </section>
            </div>
            </>
          );
        }
      })()}
    </div>
  );
}

export default Navbar;

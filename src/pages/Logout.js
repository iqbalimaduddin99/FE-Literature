import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../context/AppContext";

function Logout() {
  const [, dispatch] = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({
      type: "logout",
      payload: {},
    });
    navigate("/");
  });
  return <div></div>;
}

export default Logout;

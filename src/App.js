import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import SearchResult from "./pages/SearchResult";
import Collection from "./pages/Collection";
import DetailLiterature from "./pages/LiteratureDetail";
import AddLiterature from "./pages/AddLiterature";
import ListManage from "./pages/ListManage";
import { AppContext } from "./context/AppContext";
import { useContext, useEffect } from "react";
import { API, setAuthToken } from "./config/api";
import Logout from "./pages/Logout";
// import PrivateRoute from "./pages/PrivateRoutes";

function App() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(AppContext);

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const chekAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get("/authorization");
      if (!token) {
        dispatch({
          type: "logout",
          payload: {},
        });
        navigate("/");
      }
      dispatch({
        type: "login_success",
        payload: { ...response.data.user, token: token },
      });
    } catch (error) {}
  };

  useEffect(() => {
    chekAuth();
  }, []);
  return (
    <Routes>
      {(() => {
        if (state.isLogin === true && state.user.status === "admin") {
          return (
            <>
              <Route exact path="/manage-literature" element={<ListManage />} />
              <Route
                exact
                path="/literature/:id"
                element={<DetailLiterature />}
              />
              <Route exact path="/logout" element={<Logout />} />
            </>
          );
        } else if (state.isLogin === true && state.user.status !== "admin") {
          return (
            <>
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/home" element={<Search />} />
              <Route exact path="/search-result" element={<SearchResult />} />
              <Route exact path="/my-collection" element={<Collection />} />
              <Route exact path="/add-literature" element={<AddLiterature />} />
              <Route
                exact
                path="/literature/:id"
                element={<DetailLiterature />}
              />
              <Route exact path="/logout" element={<Logout />} />
            </>
          );
        } else {
          return <Route exact path="/" element={<Home />} />;
        }
      })()}
    </Routes>
  );
}

export default App;

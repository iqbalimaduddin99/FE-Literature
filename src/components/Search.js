import logo from "../assets/Vector.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useState } from "react";

function Search() {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const hanldeSearch = (e) => {
    setSearch(e.target.value);
  };
  const clickSearch = () => {
    navigate(`/search-result`, { state: { search: search } });
  };
  return (
    <>
      <div className="homePage">
        <div className="fontHome">
          <img className="serachlogo" alt="search" src={logo} />
        </div>
        <div className="homePageSearch">
          <input onChange={hanldeSearch} value={search} className="input" />
          <button onClick={clickSearch} className="buttonSeearch">
            <FontAwesomeIcon className="fontAwseomeSearc" icon={faSearch} />
          </button>
          {/* </Link> */}
        </div>
      </div>
    </>
  );
}

export default Search;

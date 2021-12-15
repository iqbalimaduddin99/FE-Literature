import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { API } from "../config/api";
import moment from "moment";
import PDFReader from './atoms/pdfFile/PDFReaderFile'
// import { PDFReader } from "react-read-pdf";

function SearchResult() {
  const location = useLocation();
  const [search, setSearch] = useState(location.state?.search);
  const [data, setData] = useState();
  const [yearfilter, setYear] = useState();
  const navigate = useNavigate();

  const hanldeSearch = (e) => {
    setSearch(e.target.value);
  };
  const filterYear = [
    ...new Set(data?.map((x) => moment(x.publication_date).format("YYYY"))),
  ];
  const getData = async () => {
    const response = await API.get("/literature-approved");
    console.log(response);
    setData(response.data.literature);
  };
  let updateData
  if (yearfilter !== undefined && yearfilter !== "All the year") {
   updateData = data?.filter(
      (x) =>
        moment(x.publication_date).format("YYYY") === yearfilter &&
        x?.title.toLowerCase().includes(search?.toLowerCase()) 
    );
  } else if (yearfilter === "All the year") {
    updateData = data;
  }
  useEffect(() => {
    getData();
  }, []);
  const clickDetail = (id) => {
    navigate(`/literature/${id}`);
  };
  const path = "http://localhost:5000/uploads/document/";
  return (
    <div className="homeProfile">
      <div>
        <input
          onChange={hanldeSearch}
          value={search}
          placeholder="Search for literature"
          className="input"
        />
        <button className="buttonSeearch">
          <FontAwesomeIcon className="fontAwseomeSearc" icon={faSearch} />
        </button>
      </div>
      <div className="searchresult">
        <div className="colcard">
          <p className="textSearchResult">Anytime</p>
          <select
            value={yearfilter}
            onChange={(e) => setYear(e.target.value)}
            className="selcetoption"
          >
            <option style={{ color: "#af2e1c" }} hidden>
              Choose the year
            </option>
            <option value="All the year" style={{ color: "#af2e1c" }}>
              All the year
            </option>
            {filterYear.map((x) => (
              <option style={{ color: "#af2e1c" }} value={x}>
                Year {x}
              </option>
            ))}
          </select>
        </div>
        <div className="colright">
          {(() => {
            if (yearfilter !== undefined && yearfilter !== "All the year") {
              return updateData?.map((item) => {
                return (
                  <Card
                    onClick={() => {
                      clickDetail(item.id);
                    }}
                    className="cardinvisible"
                  >
                    <PDFReader url={item?.attache} />
                    <div>
                      <p className="textBoldCard">{item.title} </p>

                      <div className="textCard">
                        <div className="elpiss">
                          <p className="textBoldyear">{item.author} </p>
                        </div>
                        <p className="textBoldautorh">
                          {moment(item.publication_date).format("YYYY")}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              });
            } else 
            if (yearfilter === "All the year") {
              return data
                ?.filter((data) => {
                  if (search === "") {
                    return data;
                  } else if (
                    data?.title?.toLowerCase().includes(search?.toLowerCase())
                  ) {
                    return data;
                  }
                })
                ?.map((data) => (
                  <Card
                    onClick={() => {
                      clickDetail(data.id);
                    }}
                    className="cardinvisible"
                  >
                    <PDFReader url={data.attache} />
                    <div>
                      <p className="textBoldCard">{data.title} </p>

                      <div className="textCard">
                        <div className="elpiss">
                          <p className="textBoldyear">{data.author} </p>
                        </div>
                        <p className="textBoldautorh">
                          {moment(data.publication_date).format("YYYY")}
                        </p>
                      </div>
                    </div>
                  </Card>
                ));
            } 
            else {
              return data
                ?.filter((data) => {
                  if (search === "") {
                    return data;
                  } else if (
                    data?.title?.toLowerCase().includes(search?.toLowerCase())
                  ) {
                    return data;
                  }
                })
                .map((data) => {
                  return (
                    <Card
                      onClick={() => {
                        clickDetail(data.id);
                      }}
                      className="cardinvisible"
                    >
                      {console.log(data?.attache)}
                      <PDFReader url={data?.attache}  />
                      <div>
                        <p className="textBoldCard">{data.title} </p>

                        <div className="textCard">
                          <div className="elpiss">
                            <p className="textBoldyear">{data.author} </p>
                          </div>
                          <p className="textBoldautorh">
                            {moment(data.publication_date).format("YYYY")}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                });
            }
          }
          
          )()}
        </div>
      </div>
    </div>
  );
}

export default SearchResult;

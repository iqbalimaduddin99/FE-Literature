import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudDownloadAlt,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkIcon } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState, useContext } from "react";
import { API } from "../config/api";
import { useParams } from "react-router";
import { AppContext } from "../context/AppContext";
import { PDFReader } from "react-read-pdf";
import moment from "moment";

function DetailLiterature() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [bookmark, setBookmark] = useState(false);
  const [state, dispatch] = useContext(AppContext);

  const handleBookmark = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = JSON.stringify({ literatureId: id });
    const response = await API.post(`/bookmark`, body, config);
    console.log(response);
    dispatch({
      type: "update",
    });
    if (response.data.message === "remove bookmark succesful") {
      setBookmark(false);
    } else if (response.data.message === "add bookmark succesful") {
      setBookmark(true);
    }
  };
  const getData = async (dataId) => {
    try {
      const response = await API.get(`/literature/${dataId}`);
      console.log(response);
      setData(response?.data?.literature);
      getBookmarks(response.data.literature.id);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getData(id);
  }, [state.updating]);
  
  const getBookmarks = async (id) => {
    try {
      const response = await API.get(`/bookmark/${id}`);
      console.log(response);
      if (response.data.message === "bookmark found") {
        setBookmark(true);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const PdfContent = data?.attache;
  return (
    <div className="DetailContent">
      <div style={{ width: "30%" }}>
        {/* <img className="picDetail" alt="pic" src={PdfConten} /> */}
        <div className="picDetail">
          {data !== undefined ? (
            <PDFReader url={data?.attache} width="400" pages={1} />
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <div className="middlecol">
        <p className="textDetail">{data?.title}</p>
        <p className="textDetailsm">{data?.author}</p>
        <p className="textDetailmd">Publication Date</p>
        <p className="textDetailmdsm">
          {moment(data?.publication_date).format("MM YYYY")}
        </p>
        <p className="textDetailmd">Pages</p>
        <p className="textDetailmdsm">{data?.pages}</p>
        <p className="textDetailmdred">ISBN</p>
        <p className="textDetailmdsm">{data?.ISBN}</p>
        {state.user.status === "admin" ? (
          <a className="buttonDetail" href={PdfContent}>
            <button className="buttonDetail">Read Document</button>
          </a>
        ) : (
          <a className="buttonDetail" download href={PdfContent}>
            <button className="buttonDetail">
              Download
              <FontAwesomeIcon
                className="fntaws"
                icon={faCloudDownloadAlt}
              />{" "}
            </button>
          </a>
        )}
      </div>
      <div className="flex-endd">
        {state.user.status === "admin" ? (
          <div></div>
        ) : (
          <button
            type="submit"
            onClick={handleBookmark}
            className="buttonBookmarka"
          >
            Add My Collection{" "}
            {bookmark ? (
              <FontAwesomeIcon className="fntawsbookmark" icon={faBookmark} />
            ) : (
              <FontAwesomeIcon className="fntawsbookmark" icon={bookmarkIcon} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default DetailLiterature;

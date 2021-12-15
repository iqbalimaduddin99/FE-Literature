import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PDFReader } from "react-read-pdf";
import { useEffect, useState } from "react";
import { API } from "../config/api";
import moment from "moment";

function Collection() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const path = "http://localhost:5000/uploads/document/";
  const clickDetail = (id) => {
    navigate(`/literature/${id}`);
  };
  const fileNew = async () => {
    const response = await API.get(`/bookmark`);
    console.log(response);
    setData(response.data.data);
  };

  useEffect(() => {
    fileNew();
  }, []);
  return (
    <div className="homeProfile">
      <p className="textBold">My Collection</p>

      <div className="colrightCollect">
        {data?.map((x) => {
          return (
            <Card
              onClick={() => {
                clickDetail(x.literature.id);
              }}
              className="cardinvisible"
            >
              <PDFReader url={path + x.literature.attache} width="200" page={1} />
              <div>
                <p className="textBoldCard">{x.literature.title} </p>
                <div className="textCard">
                  <p className="textBoldyear">{x.literature.author} </p>
                  <p className="textBoldautorh">
                    {moment(x.literature.publication_date).format("YYYY")}{" "}
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

export default Collection;

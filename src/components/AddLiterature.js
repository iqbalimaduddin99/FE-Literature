import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { API } from "../config/api";
import { PDFReader } from "react-read-pdf";
import { AppContext } from "../context/AppContext";
import { Alert } from "react-bootstrap";

function AddLiterature() {
  const [state] = useContext(AppContext);
  const [alert, setAlert] = useState();
  const [preview, setPreview] = useState();
  const [input, setInput] = useState({
    title: "",
    publication_date: "",
    pages: "",
    ISBN: "",
    author: "",
    documentFile: [],
  });
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { "Content-type": "multipart/form-data" } };

      const formData = new FormData();
      formData.set("title", input.title);
      formData.set("publication_date", input.publication_date);
      formData.set("pages", input.pages);
      formData.set("ISBN", input.ISBN);
      formData.set("author", input.author);
      formData.set("action", 'Waiting to be verified');
      formData.set(
        "documentFile",
        input.documentFile[0],
        input.documentFile[0].name
      );

      const response = await API.post("/literature", formData, config);
      console.log(response);
      if (response.status === 200) {
        setAlert("Add Literature Success");
      }
      setTimeout(() => setAlert(""), 7000);
      setInput({
        title: "",
        publication_date: "",
        pages: "",
        ISBN: "",
        author: "",
        documentFile: [],
      });
      setPreview("");
    } catch (error) {
      console.log(error.response);
      if (alert === "You have to fill all the forms") {
        setAlert("");
        setTimeout(() => setAlert("You have to fill all the forms"), 50);
      } else if (error.response === undefined) {
        setAlert("You have to fill all the forms");
      } 
    }
  };

  return (
    <div className="AddLitearta">
      <form onSubmit={handleSubmit}>
        <p className="textBold">My Collection</p>
        {alert &&
          (alert === "Add Literature Success" ? (
            <Alert
              style={{
                alignItems: "center",
                textAlign: "center",
                marginBottom: "10px",
                marginTop: "50px",
              }}
              variant="success"
            >
              {alert}
            </Alert>
          ) : (
            <Alert
              style={{
                alignItems: "center",
                textAlign: "center",
                marginBottom: "10px",
                marginTop: "50px",
              }}
              variant="danger"
            >
              {alert}
            </Alert>
          ))}
        <input
          onChange={handleChange}
          name="title"
          value={input.title}
          className="inputPost"
          placeholder="Title"
          required
        />
        <input
          onChange={handleChange}
          type="date"
          name="publication_date"
          value={input.publication_date}
          className="inputPost"
          placeholder="Publication Date"
        />
        <input
          onChange={handleChange}
          name="pages"
          value={input.pages}
          className="inputPost"
          placeholder="Pages"
        />
        <input
          onChange={handleChange}
          name="ISBN"
          value={input.ISBN}
          className="inputPost"
          placeholder="ISBN"
        />
        <input
          onChange={handleChange}
          name="author"
          value={input.author}
          className="inputPost"
          placeholder="Author"
        />
        <label className="inputFile">
          <div>
            <div>Attach Book File</div>
            <input
              onChange={handleChange}
              name="documentFile"
              type="file"
              hidden
            />
          </div>
          <FontAwesomeIcon className="fwtawsAdd" icon={faPaperclip} />
        </label>
        {preview ? 
          <div className="PdfREad">
            <PDFReader url={preview} width="160" />
          </div> : <div></div>
        }
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" className="bbuttonADd">
            Add Literature
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddLiterature;

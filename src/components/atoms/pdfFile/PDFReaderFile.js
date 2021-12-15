
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFReader = (url) => {
  return (
    <div>
      <section
        id="pdf-section"
        className="d-flex flex-column align-items-center w-100"
      >
        <Document file={url}>
          <Page width={200} pageNumber={1} />
        </Document>
      </section>
    </div>
  );
};

export default PDFReader;

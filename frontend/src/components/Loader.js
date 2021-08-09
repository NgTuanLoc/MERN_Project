import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      role="status"
      animation="border"
      style={{
        width: "100px",
        height: "100px",
        margin: "15rem auto",
        display: "block",
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loader;

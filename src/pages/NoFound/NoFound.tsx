import { Link } from "react-router-dom";

export const NoFound = () => {
  return (
    <>
      <h2>404</h2>
      <div>
        <Link to="/"> Go home</Link>
      </div>
    </>
  );
};

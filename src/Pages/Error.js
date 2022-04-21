import './Error.css';
import React from "react";

function Error() {

  return (
    <div className="Error">
      <div className="Overlay">
        <div className="ErrorText">
          <h1>404</h1>
          <p>Page not found.</p>
        </div>
      </div>
    </div>
  );
}

export default Error;

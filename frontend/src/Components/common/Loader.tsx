import React from 'react';

const Loader = ({type= "warning", size=100}) => {
    return (
      <div>
        <div
                className={`spinner-border text-${type}`}
                style={{ scale: `${100}%` }}
        ></div>{" "}
      </div>
    );
};

export default Loader;
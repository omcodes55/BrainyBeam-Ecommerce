import React from "react";

const Card = ({ name, img, description, price, shoot }) => {
  return (
    <div className="card"  >
      <img
        src={img}
        className="card-img-top"
        alt="..."
        style={{ height: "250px", width: "250px"  }}
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text" >{description}</p>
        <p style={{color:"green"}}> <strong>{price}</strong></p>
      </div>
    </div>
  );
};

export default Card;

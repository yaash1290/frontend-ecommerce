import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HomeCard = ({
  title,
  price,
  id,
  description,
  slug,
  addTocart,
  moreInfo,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="card m-3 d-flex align-items-center"
      style={{ width: "20rem" }}
    >
      <img
        style={{ height: "250px", width: "200px", cursor: "pointer" }}
        src={`${import.meta.env.VITE_APP}/api/v1/product/get-photo/${id}`}
        className="card-img-top"
        alt="product image"
        onClick={moreInfo}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h5>₹{price}</h5>
        <p className="card-text">{description}</p>
        <button className="btn btn-primary ms-3 mb-3" onClick={addTocart}>
          Add to Cart
        </button>
        <button className="btn btn-primary ms-3  mb-3" onClick={moreInfo}>
          More Info
        </button>
      </div>
    </div>
  );
};

export default HomeCard;

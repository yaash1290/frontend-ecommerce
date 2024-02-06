import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "./layouts/Layout";
import { useCart } from "../authContext/Cart";
import HomeCard from "./layouts/HomeCard";

const SingleProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useCart();
  const [name, setName] = useState("");
  const [related, setRelated] = useState([]);

  const navigate = useNavigate();

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(res.data.product);
      setName(res.data.product.name);
      similarProduct(res.data.product._id, res.data.product.category._id);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong getting single products");
    }
  };
  const similarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_APP
        }/api/v1/product/similar-product/${pid}/${cid}`
      );
      setRelated(data.product);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(related);
  useEffect(() => {
    getSingleProduct();
  }, []);
  return (
    <Layout title={`${name}`}>
      <div className="container-fluid">
        <div className="row text-center mt-2">
          <div className="col-md-12 ">
            <img
              src={`${import.meta.env.VITE_APP}/api/v1/product/get-photo/${
                product._id
              }`}
              style={{ height: "350px", width: "300px" }}
              alt={product.name}
            />
          </div>
          <div className="col-md-12">
            <h3>Name: {product.name}</h3>
            <p>Price: {product.price}</p>
            <p>Description: {product.description}</p>
            <p>Category : {product?.category?.name}</p>
            <div className="d-flex flex-column align-items-center">
              <button
                className="btn btn-success mb-3 "
                onClick={() => {
                  setCart([...cart, product]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, product])
                  );
                  toast.success("Product added to cart");
                }}
              >
                Add to Cart
              </button>
              <button
                className="btn btn-warning mb-3"
                onClick={() => navigate("/")}
              >
                Back
              </button>
            </div>
          </div>
          <div className="w-100"></div>
          <h3>Similar Product</h3>
          <hr />
          {related?.map((item) => (
            <div
              className="col-lg-3 col-md-4 d-flex justify-content-center align-items-center"
              key={item._id}
            >
              <HomeCard
                title={item.name.substr(0, 20)}
                description={item.description.substr(0, 100)}
                price={item.price}
                id={item._id}
                addTocart={() => {
                  setCart([...cart, item]);
                  localStorage.setItem("cart", JSON.stringify([...cart, item]));
                  toast.success("Added to cart");
                }}
                slug={item.slug}
                moreInfo={() => {
                  navigate(`/product/${item.slug}`);
                  window.location.reload();
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SingleProduct;

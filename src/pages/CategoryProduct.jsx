import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import HomeCard from "../components/layouts/HomeCard";
import { useCart } from "../authContext/Cart";

const CategoryProduct = () => {
  const [product, setProduct] = useState([]);
  const params = useParams();
  const [progress, setProgress] = useState(0);
  const [cart, setCart] = useCart();
  const getCategoryProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP}/api/v1/category/get-category/${
          params.slug
        }`
      );
      setProgress(70);
      setProduct(data.product);
      setProgress(100);
    } catch (error) {
      console.log(error);
      setProgress(100);
    }
  };
  useEffect(() => {
    getCategoryProduct();
    console.log(product);
  }, []);
  return (
    <Layout title={`Products by ${params.slug} category`} progress={progress}>
      <div className="container">
        <div className="row text-center">
          {product.map((item) => (
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
                moreInfo={() => navigate(`/product/${item.slug}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;

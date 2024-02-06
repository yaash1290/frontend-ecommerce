import React from "react";
import Layout from "./layouts/Layout";
import useCategory from "../hooks/useCategory";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const categories = useCategory();
  const navigate = useNavigate();
  return (
    <Layout title={"Category page"}>
      <div className="container ">
        <h1 className="text-center">All Category</h1>
        <div className="row text-center">
          {categories.map((item) => (
            <button
              className="col-md-12 mb-3 btn btn-warning"
              onClick={() => navigate(`/category/${item.slug}`)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;

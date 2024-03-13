"use client";

import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Link from "next/link";
import PieChart from "../components/PieChart";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
import Router from "next/router";
import ProductDetails from "./[id]/page";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  useEffect(() => {
     const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
        const uniqueCategories = [
          ...new Set(data.products.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

  const categoryCounts = categories.map((category) => ({
    category,
    count: products.filter((product) => product.category === category).length,
  }));

  const filteredProducts = products.filter(
    (product) => !selectedCategory || product.category === selectedCategory
  );
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage))
      setCurrentPage(currentPage + 1);
  };
  const yourCategoriesData = categories.map((category) => ({
    category,
    count: products.filter((product) => product.category === category).length,
  }));

  return (
    <div>
      <NavBar
        email={email}
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <div
        className="relative top-0 left-0 w-48 h-48 center mt-16
      "
      >
        <PieChart categories={yourCategoriesData} />
      </div>
      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {paginatedProducts.map((product) => (
          <div className="max-w-md mx-auto m-3 lg:grid-cols-3 bg-white shadow-lg rounded-lg overflow-hidden flex ">
            <img
              className="w-48 h-48 object-cover md:w-48"
              src={product.thumbnail}
              alt={product.title}
            />
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  {product.category}
                </div>
                <Link href="/product/[id]" as={`/product/${product.id}`}>
                  {product.title}
                </Link>
               

                <p className="mt-2 text-gray-500">{product.description}</p>
              </div>
              <div className="mt-4">
                <span className="text-gray-500">Price: ${product.price}</span>
              </div>
              <div className="mt-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-4"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={
            currentPage === Math.ceil(filteredProducts.length / itemsPerPage)
          }
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;

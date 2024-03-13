"use client";

import { useEffect, useState } from "react";

const ProductDetails = ({ params }) => {
  const id = params.id;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`https://dummyjson.com/products/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const productData = await response.json();
          setProduct(productData);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900">
              {product.title}
            </h1>
          </div>
        </div>
        <div className="py-12">
          <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative">
                    <img
                      className="w-full h-64 object-cover"
                      src={product.thumbnail}
                      alt={product.title}
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {product.title}
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                      {product.category}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      {product.description}
                    </p>
                    <div className="mt-4">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price}
                      </span>
                      <span className="ml-3 text-sm text-gray-500">
                        {product.discountPercentage}% off
                      </span>
                    </div>
                    <div className="mt-4">
                      <span className="text-sm font-medium text-gray-900">
                        Rating: {product.rating}
                      </span>
                    </div>
                    <div className="mt-4">
                      <span className="text-sm font-medium text-gray-900">
                        Stock: {product.stock}
                      </span>
                    </div>
                    <div className="mt-4">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-12">
          <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-2xl font-extrabold text-gray-900">Images</h2>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {product.images.map((image, index) => (
                  <div key={index} className="col-span-1">
                    <img
                      className="h-48 w-full object-cover shadow-lg rounded-lg"
                      src={image}
                      alt={`Product Image ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

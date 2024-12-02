import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import { setCategories, setProducts, setChecked } from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector((state) => state.shop);

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, categoriesQuery.isLoading, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => product.price.toString().includes(priceFilter) || product.price === parseInt(priceFilter, 10)
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter, filteredProductsQuery.isLoading]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(new Set(filteredProductsQuery.data?.map((product) => product.brand).filter((brand) => brand !== undefined))),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };
<div className="w-full md:w-1/5 bg-[] from-pink-500 to-orange-500 p-6 rounded-lg shadow-xl transform hover:scale-105 transition duration-300"></div>
  return (
    <div className="container mx-auto py-8 px-6">
      <div className="flex flex-wrap md:flex-nowrap">
{/* Sidebar */}
<div className="w-full md:w-1/5 bg-[#f3e1e1] from-pink-500 to-orange-500 p-6 rounded-lg shadow-xl transform hover:scale-105 transition duration-300">
      <h2 className="text-center text-3xl font-bold text-[#91614f] mb-8"></h2>

      {/* Categories Filter */}
      <h3 className="text-xl text-[#91614f] mb-4">Danh Mục</h3>
      <div className="space-y-4">
        {categories?.map((c) => (
          <div key={c._id} className="flex items-center">
            <input
              type="checkbox"
              id={`category-${c._id}`}
              onChange={(e) => handleCheck(e.target.checked, c._id)}
              className="w-5 h-5 text-pink-300 bg-gray-100 border-gray-300 rounded transition duration-200 hover:ring-2 hover:ring-pink-400"
            />
            <label htmlFor={`category-${c._id}`} className="ml-3 text-lg text-[#91614f]">{c.name}</label>
          </div>
        ))}
      </div>

      {/* Brands Filter */}
      <h3 className="text-xl text-[#91614f] mb-4 mt-6">Tag</h3>
      <div className="space-y-4">
        {uniqueBrands?.map((brand) => (
          <div key={brand} className="flex items-center">
            <input
              type="radio"
              id={brand}
              name="brand"
              onChange={() => handleBrandClick(brand)}
              className="w-5 h-5 text-pink-300 bg-gray-100 border-gray-300 focus:ring-pink-400 transition duration-200"
            />
            <label htmlFor={brand} className="ml-3 text-lg text-[#91614f]">{brand}</label>
          </div>
        ))}
      </div>

      {/* Price Filter */}
      <h3 className="text-xl text-[#91614f] mb-4 mt-6">Giá</h3>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Nhập giá"
          value={priceFilter}
          onChange={handlePriceChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Reset Button */}
      <button
        onClick={() => window.location.reload()}
        className="w-full py-3 bg-pink-500 text-white font-bold rounded-lg transform hover:scale-105 transition duration-300"
      >
        Đăt lại
      </button>
    </div>

        {/* Products Section */}
<div className="w-full md:w-4/5 p-6">
  <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
    {products?.length} Products
  </h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
    {products.length === 0 ? (
      <div className="w-full col-span-4 flex justify-center items-center mt-8">
        <Loader />
      </div>
    ) : (
      products?.map((p) => (
        <div key={p._id} className="flex justify-center">
          <ProductCard p={p} />
        </div>
      ))
    )}
  </div>
</div>


      </div>
    </div>
  );
};

export default Shop;

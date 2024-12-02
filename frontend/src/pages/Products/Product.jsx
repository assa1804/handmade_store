import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[12rem] ml-[1rem] p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out">
      <div className="relative mb-4">
        {/* Hình ảnh và Icon trái tim */}
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-[150px] h-[150px] object-contain rounded-lg transition duration-300 transform hover:scale-105"
          />
        </Link>
        <HeartIcon
          product={product}
          className="absolute top-2 right-2 text-red-500 cursor-pointer transition duration-300 transform hover:scale-110"
        />
      </div>
      
      {/* Thông tin sản phẩm */}
      <div className="p-2 flex flex-col">
        <Link to={`/product/${product._id}`} className="text-left">
          <h2 className="text-base font-semibold text-[#333333] break-words hover:text-[#91614F] transition duration-300">
            {product.name}
          </h2>
        </Link>

        {/* Giá sản phẩm */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-[#91614F] text-lg font-semibold">
            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Product;

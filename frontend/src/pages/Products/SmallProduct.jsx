import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[12rem] ml-[1rem] p-2">
      {/* Bọc toàn bộ phần tử trong Link */}
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="h-24 w-full object-contain rounded"
          />
          <HeartIcon product={product} />
        </div>

        <div className="p-2">
          <h2 className="flex flex-col justify-between items-start text-xs">
            <div className="text-sm w-full overflow-hidden text-ellipsis">
              {product.name}
            </div>
            <span className="bg-pink-100 text-pink-800 text-xs font-medium mt-1 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300 w-full text-left">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
            </span>
          </h2>
        </div>
      </Link>
    </div>
  );
};

SmallProduct.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default SmallProduct;

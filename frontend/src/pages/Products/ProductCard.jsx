import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";
import PropTypes from "prop-types";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
<div className="relative p-4 bg-white rounded-lg shadow-lg w-[220px] h-[400px] transform hover:scale-105 transition duration-300 flex flex-col">
  <section className="relative mb-4 flex justify-center items-center">
    {/* Hiển thị ảnh sản phẩm */}
    <Link to={`/product/${p._id}`}>
      <img
        className="cursor-pointer w-[180px] h-[180px] object-contain"
        src={p.image}
        alt={p.name}
      />
      {/* Hiển thị thương hiệu ở góc trên trái */}
      <span className="absolute top-2 left-2 bg-[#F3E1E1] text-[#91614F] text-sm font-medium px-3 py-1 rounded-md">
        {p?.brand}
      </span>
    </Link>


    <HeartIcon product={p} className="absolutetop-1 right-2" />

  </section>

  <div className="p-5 flex flex-col justify-between h-[200px]">
    <div className="mb-4 flex-1">
      {/* Tên sản phẩm sẽ hiển thị đầy đủ mà không bị cắt */}
      <h5 className="text-l font-semibold text-[#565853] mb-2 break-words">
        {p?.name}
      </h5>
      <p className="text-[#91614F] font-semibold text-l">
        {p?.price?.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </p>
    </div>

    <section className="flex justify-between items-center gap-2">
    
      <Link
        to={`/product/${p._id}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#91614F] hover:bg-[#76563C] focus:ring-4 focus:outline-none focus:ring-[#91614F]/50 rounded-md"
      >
        Xem
      </Link>

      <button
        className="p-2 bg-[#F3E1E1] hover:bg-[#91614F] rounded-full"
        onClick={() => addToCartHandler(p, 1)}
      >
        <AiOutlineShoppingCart size={25} color="#565853" />
      </button>
    </section>
  </div>
</div>

  );
};

ProductCard.propTypes = {
  p: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    brand: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;

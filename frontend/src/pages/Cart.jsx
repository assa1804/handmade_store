import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
<div className="container mx-auto mt-8 text-[#565853]">
  {cartItems.length === 0 ? (
    <div className="text-center text-xl">
      <p className="mb-4">Giỏ hàng của bạn trống.</p>
      <Link
        to="/shop"
        className="text-[#91614F] font-semibold hover:underline"
      >
        Đến Cửa Hàng
      </Link>
    </div>
  ) : (
    <div className="flex flex-col lg:flex-row justify-between gap-8">
      {/* Danh sách sản phẩm */}
      <div className="flex-1 bg-[#FEF4EB] rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-6">Giỏ Hàng</h1>

        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between bg-[#F3E1E1] p-4 mb-4 rounded-lg shadow-md"
          >
            {/* Hình ảnh sản phẩm */}
            <div className="w-[6rem] h-[6rem]">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Thông tin sản phẩm */}
            <div className="flex-1 ml-4">
              <Link
                to={`/product/${item._id}`}
                className="text-[#91614F] font-semibold text-lg hover:underline"
              >
                {item.name}
              </Link>
              <p className="text-sm text-[#565853] mt-1">{item.brand}</p>
              <p className="text-base font-bold text-[#91614F] mt-2">
                {item.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>

            {/* Chọn số lượng */}
            <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
  {/* Decrement Button */}
  <button
    onClick={() => addToCartHandler(item, Math.max(1, item.qty - 1))}
    className="p-2 bg-[#F3E1E1] text-[#91614F] rounded-l-lg"
    disabled={item.qty === 1}
  >
    -
  </button>

  {/* Quantity Display */}
  <span className="px-3 py-2 text-[#565853]">{item.qty}</span>

  {/* Increment Button */}
  <button
    onClick={() => addToCartHandler(item, Math.min(item.countInStock, item.qty + 1))}
    className="p-2 bg-[#F3E1E1] text-[#91614F] rounded-r-lg"
    disabled={item.qty === item.countInStock}
  >
    +
  </button>
</div>


              {/* Xóa sản phẩm */}
              <button
                className="text-[#91614F] hover:text-red-600 transition duration-300"
                onClick={() => removeFromCartHandler(item._id)}
              >
                <FaTrash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tổng giá trị giỏ hàng */}
      <div className="bg-[#FEF4EB] rounded-lg shadow-lg p-6 w-full lg:w-[30%]">
        <h2 className="text-xl font-semibold mb-4">Tóm Tắt Đơn Hàng</h2>
        <div className="text-lg mb-4">
          <span>Số lượng sản phẩm: </span>
          <strong>
            {cartItems.reduce((acc, item) => acc + item.qty, 0)}
          </strong>
        </div>
        <div className="text-lg mb-6">
          <span>Tổng cộng: </span>
          <strong className="text-[#91614F]">
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
          </strong>
        </div>
        {!userInfo.isAdmin && (
  <button
    className="bg-[#91614F] text-white font-semibold py-3 px-6 w-full rounded-full hover:bg-[#565853] transition duration-300"
    disabled={cartItems.length === 0}
    onClick={checkoutHandler}
  >
    Thanh Toán
  </button>
)}

      </div>
    </div>
  )}
</div>

    </>
  );
};

export default Cart;

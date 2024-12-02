import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
<div className="container mx-auto mt-8">
  {/* Progress Steps */}
  <ProgressSteps step1 step2 step3 />

  {cart.cartItems.length === 0 ? (
    <Message>Your cart is empty</Message>
  ) : (
<div className="overflow-x-auto bg-white rounded-lg shadow-lg">
  <table className="w-full border-collapse table-auto">
    <thead className="bg-[#f8f8f8] text-gray-700">
      <tr>
        <th className="px-3 py-3 text-left font-semibold">Image</th>
        <th className="px-3 py-3 text-left font-semibold">Product</th>
        <th className="px-3 py-3 text-left font-semibold">Quantity</th>
        <th className="px-3 py-3 text-left font-semibold">Price</th>
        <th className="px-3 py-3 text-left font-semibold">Total</th>
      </tr>
    </thead>

    <tbody className="text-gray-800">
      {cart.cartItems.map((item, index) => (
        <tr key={index} className="border-b hover:bg-[#f3f3f3]">
          <td className="px-3 py-2">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md"
            />
          </td>

          <td className="px-3 py-2">
            <Link to={`/product/${item.product}`} className="text-[#4b8e8d] hover:text-[#91614f] font-semibold">
              {item.name}
            </Link>
          </td>
          <td className="px-3 py-2">{item.qty}</td>
          <td className="px-3 py-2">{item.price.toFixed(2)}</td>
          <td className="px-3 py-2">
            $ {(item.qty * item.price).toFixed(2)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  )}

  <div className="mt-8 bg-[#fef4eb] p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-semibold text-[#565853] mb-5">Order Summary</h2>
    <div className="flex justify-between flex-wrap p-8 bg-[#94c6c4] text-[#91614f] rounded-lg shadow-lg">
      <ul className="text-lg">
        <li>
          <span className="font-semibold mb-4">Items:</span> $
          {cart.itemsPrice}
        </li>
        <li>
          <span className="font-semibold mb-4">Shipping:</span> $
          {cart.shippingPrice}
        </li>
        <li>
          <span className="font-semibold mb-4">Tax:</span> $
          {cart.taxPrice}
        </li>
        <li>
          <span className="font-semibold mb-4">Total:</span> $
          {cart.totalPrice}
        </li>
      </ul>

      {error && <Message variant="danger">{error.data.message}</Message>}

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-[#91614f]">Shipping</h2>
        <p className="text-[#91614f]">
          <strong>Address:</strong> {cart.shippingAddress.address},{" "}
          {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
          {cart.shippingAddress.country}
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-[#91614f]">Payment Method</h2>
        <strong className="text-[#91614f]">Method:</strong> {cart.paymentMethod}
      </div>
    </div>

    <button
      type="button"
      className="bg-[#91614f] text-white py-2 px-4 rounded-full text-lg w-full mt-4 hover:bg-[#565853] transition"
      disabled={cart.cartItems === 0}
      onClick={placeOrderHandler}
    >
      Place Order
    </button>

    {isLoading && <Loader />}
  </div>
</div>

    </>
  );
};

export default PlaceOrder;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  // Payment
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="container mx-auto mt-10 bg-[#fef4eb] p-6">
  <ProgressSteps step1 step2 />
  <div className="mt-[10rem] flex justify-around items-center flex-wrap">
    <form onSubmit={submitHandler} className="w-[40rem] bg-[#fef4eb] p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-[#565853] mb-4">Shipping</h1>
      <div className="mb-4">
        <label className="block text-[#565853] mb-2">Address</label>
        <input
          type="text"
          className="w-full p-2 border rounded bg-[#f3e1e1] focus:outline-none focus:ring-2 focus:ring-[#94c6c4]"
          placeholder="Enter address"
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-[#565853] mb-2">City</label>
        <input
          type="text"
          className="w-full p-2 border rounded bg-[#f3e1e1] focus:outline-none focus:ring-2 focus:ring-[#94c6c4]"
          placeholder="Enter city"
          value={city}
          required
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-[#565853] mb-2">Postal Code</label>
        <input
          type="text"
          className="w-full p-2 border rounded bg-[#f3e1e1] focus:outline-none focus:ring-2 focus:ring-[#94c6c4]"
          placeholder="Enter postal code"
          value={postalCode}
          required
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-[#565853] mb-2">Country</label>
        <input
          type="text"
          className="w-full p-2 border rounded bg-[#f3e1e1] focus:outline-none focus:ring-2 focus:ring-[#94c6c4]"
          placeholder="Enter country"
          value={country}
          required
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-[#565853] mb-2">Select Method</label>
        <div className="mt-2">
          <label className="inline-flex items-center text-[#565853]">
            <input
              type="radio"
              className="form-radio text-[#91614f]"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="ml-2">PayPal or Credit Card</span>
          </label>
        </div>
      </div>

      <button
        className="bg-[#91614f] text-white py-2 px-4 rounded-full text-lg w-full hover:bg-[#94c6c4] transition"
        type="submit"
      >
        Continue
      </button>
    </form>
  </div>
</div>

  );
};

export default Shipping;

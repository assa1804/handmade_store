import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,

  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

import TopProducts from "./TopProducts";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState('description');
  

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);
  

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <div>
        <Link
          to="/"
          className="text-[#91614F] font-semibold hover:underline ml-[10rem]"
        >
          Quay lại
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap relative items-between mt-[2rem] ml-[10rem]">
  <div className="relative">
  {/* Hình ảnh và Icon trái tim */}
  <img
    src={product.image}
    alt={product.name}
    className="w-[300px] h-[300px] rounded-lg border border-red"
    style={{
      objectFit: "contain",
    }}
  />
  
  {/* Icon trái tim */}
  <HeartIcon product={product} className="absolute top-2 right-2 text-red-500" />
</div>


            {/* Chi tiết sản phẩm */}
            <div className=" ml-[10rem] flex flex-col justify-between bg-[#FEF4EB] p-6 rounded-lg shadow-lg w-[30rem]">
              <h2 className="text-3xl font-semibold text-[#565853] mb-4">
                {product.name}
              </h2>

              <p className="text-5xl my-4 font-extrabold text-[#91614F]">
                {product.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>

              {/* Thông tin bổ sung */}
              <div className="flex items-center justify-between w-[20rem]">
                <div>
                  <h1 className="flex items-center mb-6 text-[#565853]">
                    <FaStore className="mr-2 text-[#94C6C4]" />
                    Danh mục: {product.category ? product.category.name : "Không có danh mục"}
                  </h1>
                  <h1 className="flex items-center mb-6 text-[#565853]">
                    <FaStore className="mr-2 text-[#94C6C4]" /> TAG: {product.brand}
                  </h1>

                </div>
                <div>

                  <h1 className="flex items-center mb-6 text-[#565853]">
                    <FaShoppingCart className="mr-2 text-[#94C6C4]" /> Số lượng: {product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-6 text-[#565853]">
                    <FaBox className="mr-2 text-[#94C6C4]" /> Kho: {product.countInStock}
                  </h1>
                </div>
              </div>

              {/* Ratings và nút thêm giỏ hàng */}
              <div className="flex justify-between items-center">
              <h1 className="flex items-center mb-6 text-[#565853]">
                    <FaStar className="mr-2 text-[#94C6C4]" /> Đánh giá:
                  </h1>
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews}  ⭐`}
                />

                <div className="flex items-center">
                  {/* Decrement Button */}
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-2 bg-[#F3E1E1] text-[#91614F] rounded-l-lg"
                    disabled={qty === 1}
                  >
                    -
                  </button>

                  {/* Quantity Display */}
                  <span className="p-2 text-[#91614F]">{qty}</span>

                  {/* Increment Button */}
                  <button
                    onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                    className="p-2 bg-[#F3E1E1] text-[#91614F] rounded-r-lg"
                    disabled={qty === product.countInStock}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className="bg-[#cfe6b8] text-[#91614f] py-2 px-4 rounded-lg mt-4"
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className=" mt-5 container flex flex-wrap ml-[10rem] bg-[#F3E1E1] p-6 rounded-lg">
            <button
              onClick={() => setActiveTab('description')}
              className={`mr-4 ${activeTab === 'description' ? 'font-semibold' : ''}`}
            >
              MÔ TẢ
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`mr-4 ${activeTab === 'reviews' ? 'font-semibold' : ''}`}
            >
              TẤT CẢ ĐÁNH GIÁ
            </button>
            <button
              onClick={() => setActiveTab('productTabs')}
              className={`mr-4 ${activeTab === 'productTabs' ? 'font-semibold' : ''}`}
            >
              ĐÁNH GIÁ CỦA BẠN
            </button>
          </div>

          {/* Tab Content */}
          <div className="container flex flex-wrap items-start justify-between ml-[10rem] bg-[#F3E1E1] p-6 rounded-lg">
            {activeTab === 'description' && (
              <div className="flex flex-col mb-4">
  <h2 className="text-xl font-semibold mb-4">Mô Tả Sản Phẩm</h2>
  <hr className="mb-4" />
  <p className="text-[#91614F] text-lg">{product.description}</p>
</div>


            )}

{activeTab === 'reviews' && (
    <div className="tab-content">
      <h2 className="text-xl font-semibold mb-4">Đánh giá và Bình luận</h2>
      <hr className="mb-4" />
      {product.reviews.length > 0 ? (
        product.reviews.map((review) => (
          <div key={review._id} className="review-item mb-4">
            <div className="review-header flex items-center">
              <h3 className="text-lg font-semibold mr-4">{review.name}</h3>
              <span className="text-sm text-yellow-500">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <span key={index} className="star">★</span>
                ))}
                {Array.from({ length: 5 - review.rating }).map((_, index) => (
                  <span key={index} className="star text-gray-400">★</span>
                ))}
              </span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
            <div className="review-date text-sm text-gray-500">
              Ngày: {new Date(review.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))
      ) : (
        <p>Chưa có đánh giá nào.</p>
      )}
    </div>
  )}


            {activeTab === 'productTabs' && (
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            )}
          </div>

          <TopProducts></TopProducts>
          
        </>
      )}
    </>
  );
};

export default ProductDetails;


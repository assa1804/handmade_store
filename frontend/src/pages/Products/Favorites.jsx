import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="ml-[5rem] mt-[3rem] px-[2rem] max-w-[1200px]">
      {/* Tiêu đề */}
      <h3 className="p-4 bg-[#cde3bb] text-[#5D4B3C] text-[2rem] font-semibold text-center rounded-md shadow-md max-w-[400px] mx-auto">
        Sản Phẩm Yêu Thích
      </h3>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-[3rem]">
        {favorites.length > 0 ? (
          favorites.map((product) => (
            <div
              key={product._id}
              className="p-4 bg-[#f5f7f3] rounded-lg shadow hover:shadow-lg hover:scale-105 transition duration-300"
            >
              <Product product={product} />
            </div>
          ))
        ) : (
          <p className="text-[#5D4B3C] text-lg text-center col-span-full">
            Không có sản phẩm yêu thích nào.
          </p>
        )}
      </div>
    </div>
  );
};

export default Favorites;

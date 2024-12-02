import { Link } from "react-router-dom";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div className="text-center text-lg text-gray-600">Đang tải dữ liệu...</div>;
  }

  if (isError) {
    return <div className="text-center text-lg text-red-600">Không thể tải sản phẩm. Vui lòng thử lại!</div>;
  }

  return (
    <div className="container mx-auto px-4 lg:px-16 py-8 ml-[12rem] ">
      <div className="flex flex-col lg:flex-row">
        {/* Menu quản trị */}
        <AdminMenu />

        {/* Danh sách sản phẩm */}
        <div className="mt-6 lg:mt-0 lg:ml-6 flex-1">
          <h1 className="text-3xl font-bold text-[#565853] mb-8">
            Tất Cả Sản Phẩm ({products.length})
          </h1>

          {/* Bảng sản phẩm */}
          <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full bg-white">
              <thead className="bg-[#F3E1E1]">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-[#91614F]">Ảnh</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-[#91614F]">Tên Sản Phẩm</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-[#91614F]">Danh Mục</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-[#91614F]">Mô Tả</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-[#91614F]">Giá</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-[#91614F]"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product._id}
                    className={`hover:bg-gray-100 transition ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    {/* Cột Ảnh */}
                    <td className="px-4 py-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-md shadow-md"
                      />
                    </td>
                    {/* Cột Tên */}
                    <td className="px-4 py-4 text-sm text-[#565853] font-medium">
                      {product.name}
                    </td>
                    {/* Cột Danh Mục */}
                    <td className="px-4 py-4 text-sm text-[#565853] font-medium">
                      {product.category ? product.category.name : "Không có danh mục"}
                    </td>
                    {/* Cột Mô Tả */}
                    <td className="px-4 py-4 text-sm text-[#565853]">
                      {product.description.length > 100
                        ? product.description.substring(0, 100) + "..."
                        : product.description}
                    </td>
                    {/* Cột Giá */}
                    <td className="px-4 py-4 text-sm text-[#91614F] font-semibold">
                      {product.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    {/* Cột Hành Động */}
                    <td className="px-4 py-4">
                      <Link
                        to={`/admin/product/update/${product._id}`}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#94C6C4] rounded-lg hover:bg-[#565853] transition shadow-lg"
                        title="Chỉnh sửa sản phẩm"
                      >
                        <i className="fas fa-edit"></i>
                        <span className="ml-2">Chọn</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;

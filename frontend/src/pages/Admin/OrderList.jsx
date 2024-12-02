import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice"; // Assuming you have this API slice
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import AdminMenu from "./AdminMenu"; // Admin navigation menu

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {/* Show Loader while data is being fetched */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="ml-[15rem] container mx-auto px-4 lg:px-16 py-8">
          <h1 className="text-3xl font-semibold text-[#565853] mb-6">Quản Lý Đơn Hàng</h1>

          <div className="overflow-x-auto rounded-lg shadow-lg bg-[#FEF4EB]">
            <AdminMenu />

            <table className="min-w-full table-auto">
              {/* Table Header */}
              <thead className="bg-[#94C6C4] text-white">
                <tr>
                  <th className="text-left pl-4 py-3">SẢN PHẨM</th>
                  <th className="text-left pl-4 py-3">MÃ ĐƠN HÀNG</th>
                  <th className="text-left pl-4 py-3">NGƯỜI DÙNG</th>
                  <th className="text-left pl-4 py-3">NGÀY</th>
                  <th className="text-left pl-4 py-3">TỔNG CỘNG</th>
                  <th className="text-left pl-4 py-3">THANH TOÁN</th>
                  <th className="text-left pl-4 py-3">GIAO HÀNG</th>
                  <th className="text-left pl-4 py-3"></th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-[#F3E1E1] transition duration-300">
                    {/* Product Image */}
                    <td className="pl-4 py-4">
                      <img
                        src={order.orderItems[0]?.image}
                        alt={order._id}
                        className="w-[6rem] h-[6rem] object-cover rounded-lg shadow-md"
                      />
                    </td>

                    {/* Order ID */}
                    <td className="pl-4 py-4">{order._id}</td>

                    {/* User */}
                    <td className="pl-4 py-4">{order.user ? order.user.username : "N/A"}</td>

                    {/* Date */}
                    <td className="pl-4 py-4">{order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}</td>

                    {/* Total */}
                    <td className="pl-4 py-4 text-[#91614F] font-semibold">₫ {order.totalPrice}</td>

                    {/* Payment Status */}
                    <td className="pl-4 py-4">
                      {order.isPaid ? (
                        <p className="p-1 text-center bg-green-400 text-white rounded-full w-[8rem]">
                          Đã hoàn tất
                        </p>
                      ) : (
                        <p className="p-1 text-center bg-red-400 text-white rounded-full w-[8rem]">
                          Chưa thanh toán
                        </p>
                      )}
                    </td>

                    {/* Delivery Status */}
                    <td className="pl-4 py-4">
                      {order.isDelivered ? (
                        <p className="p-1 text-center bg-green-400 text-white rounded-full w-[8rem]">
                          Đã giao
                        </p>
                      ) : (
                        <p className="p-1 text-center bg-red-400 text-white rounded-full w-[8rem]">
                          Chưa giao
                        </p>
                      )}
                    </td>

                    {/* View Details Button */}
                    <td className="pl-4 py-4 text-center">
                      <Link to={`/order/${order._id}`}>
                        <button className="px-6 py-3 bg-[#91614F] text-white rounded-lg hover:bg-[#565853] transition duration-300">
                          Xem Chi Tiết
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderList;

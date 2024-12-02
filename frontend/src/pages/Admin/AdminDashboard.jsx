import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers } = useGetUsersQuery();
  const { data: orders } = useGetTotalOrdersQuery();

  // Hàm định dạng tiền tệ VNĐ
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);

  return (
    <>
      <div className="bg-[#f3e1e1] py-6">
        <h1 className="text-3xl font-semibold text-center text-[#91614f] mb-6">
          Chào mừng quản trị viên
        </h1>
      </div>
      <AdminMenu />

      <div className="ml-[15rem] py-10">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Thẻ Doanh thu */}
          <div className="rounded-lg bg-[#f3e1e1] p-6 shadow-lg text-[#91614f]">
            <p className="mt-4 text-sm font-semibold">Doanh thu</p>
            <h1 className="text-2xl font-bold mt-2">
              {isLoading ? <Loader /> : formatCurrency(sales?.totalSales || 0)}
            </h1>
          </div>

          {/* Thẻ Khách hàng */}
          <div className="rounded-lg bg-[#f3e1e1] p-6 shadow-lg text-[#91614f]">
            <p className="mt-4 text-sm font-semibold">Khách hàng</p>
            <h1 className="text-2xl font-bold mt-2">
              {isLoading ? <Loader /> : customers?.length}
            </h1>
          </div>

          {/* Thẻ Đơn hàng */}
          <div className="rounded-lg bg-[#f3e1e1] p-6 shadow-lg text-[#91614f]">
            <p className="mt-4 text-sm font-semibold">Tổng đơn hàng</p>
            <h1 className="text-2xl font-bold mt-2">
              {isLoading ? <Loader /> : orders?.totalOrders}
            </h1>
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminDashboard;

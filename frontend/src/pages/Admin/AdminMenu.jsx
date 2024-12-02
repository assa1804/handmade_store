import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";


const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className={`${
          isMenuOpen ? "top-2 right-2" : "top-5 right-7"
        } bg-[#91614f] p-2 fixed rounded-lg z-50`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" />
        ) : (
          <>
            <div className="w-6 h-0.5 bg-[#f3e1e1] my-1"></div>
            <div className="w-6 h-0.5 bg-[#f3e1e1] my-1"></div>
            <div className="w-6 h-0.5 bg-[#f3e1e1] my-1"></div>
          </>
        )}
      </button>

      {isMenuOpen && (
        <section className="bg-[#94c6c4] p-4 fixed right-7 top-5 z-40">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#ffecdb] rounded-sm"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "#91614f" : "#4b3f33", // Nâu đậm khi chọn
                })}
              >
                ADMIN
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#ffecdb] rounded-sm"
                to="/admin/categorylist"
                style={({ isActive }) => ({
                  color: isActive ? "#91614f" : "#4b3f33",
                })}
              >
                Danh Mục
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#ffecdb] rounded-sm"
                to="/admin/productlist"
                style={({ isActive }) => ({
                  color: isActive ? "#91614f" : "#4b3f33",
                })}
              >
                Thêm Sản Phẩm
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#ffecdb] rounded-sm"
                to="/admin/allproductslist"
                style={({ isActive }) => ({
                  color: isActive ? "#91614f" : "#4b3f33",
                })}
              >
                Tất Cả Sản Phẩm
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#ffecdb] rounded-sm"
                to="/admin/userlist"
                style={({ isActive }) => ({
                  color: isActive ? "#91614f" : "#4b3f33",
                })}
              >
                Quản Lý Người Dùng
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#ffecdb] rounded-sm"
                to="/admin/orderlist"
                style={({ isActive }) => ({
                  color: isActive ? "#91614f" : "#4b3f33",
                })}
              >
                Quản Lý Đơn Hàng
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;

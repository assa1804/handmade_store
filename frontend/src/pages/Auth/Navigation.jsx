import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import "./Navigation.css";

const Navigation = () => {
  
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const [showSidebar] = useState(false); 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const ProfileDropdown = () => {
    return (
      <div className="relative">
      {/* Button để mở/đóng dropdown */}
      <button
        onClick={toggleDropdown} // Khi nhấn vào button sẽ gọi toggleDropdown
        className="flex items-center text-[#565853] focus:outline-none"
      >
        {/* Hiển thị tên người dùng nếu có */}
        {userInfo && <span className="text-white">{userInfo.username}</span>}
    
        {/* Mũi tên SVG sẽ xoay 180 độ nếu dropdownOpen là true */}
        {userInfo && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ml-1 ${dropdownOpen ? "transform rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} // Điều chỉnh hình dạng mũi tên
            />
          </svg>
        )}
      </button>
    
      {/* Dropdown menu chỉ hiển thị khi dropdownOpen là true và userInfo tồn tại */}
      {userInfo && dropdownOpen && (
        <ul className="absolute bottom-full right-0 mb-4 space-y-3 bg-[#FEF4EB] text-[#565853] transition-all duration-300 rounded-lg shadow-lg">
          <li>
            <Link
              to="/profile"
              className="block px-6 py-3 text-black bg-[#94c6c4] hover:bg-[#fcb69f] rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              Hồ Sơ
            </Link>
          </li>
          <li>
            <Link
              to="#"
              onClick={logoutHandler}
              className="block px-6 py-3 text-black bg-[#94c6c4] hover:bg-[#fcb69f] rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              Đăng Xuất
            </Link>
          </li>
        </ul>
      )}
    </div>
    );
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        userInfo && userInfo.isAdmin ? "flex w-[15%]" : showSidebar ? "hidden" : "flex w-[4%] hover:w-[15%]"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] h-[100vh] fixed ${
        userInfo && userInfo.isAdmin ? "admin" : "user"
      }`}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        {userInfo && userInfo.isAdmin ? (
          <>
            <li style={{ listStyleType: "none", marginBottom: "8px" }}>
              <NavLink
                className="list-item py-3 px-4 block hover:bg-[#f4e3d3] rounded-lg transition-all duration-300"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "#91614f" : "#4b3f33",
                  fontWeight: isActive ? "bold" : "normal",
                  fontSize: isActive ? "18px" : "16px",
                  backgroundColor: isActive ? "#ffebcd" : "transparent",
                })}
              >
                <i className="fas fa-tachometer-alt mr-2" style={{ fontSize: "18px", fontWeight: "bold" }}></i>
                <span style={{ fontWeight: "bold" }}>Trang Quản Trị</span>
              </NavLink>
            </li>
            {/* Admin-specific links */}
            <li style={{ listStyleType: "none", marginBottom: "8px" }}>
              <NavLink
                className="list-item py-3 px-4 block hover:bg-[#f4e3d3] rounded-lg transition-all duration-300"
                to="/admin/categorylist"
                style={({ isActive }) => ({
                  color: isActive ? "#91614f" : "#4b3f33",
                  fontWeight: isActive ? "bold" : "normal",
                  backgroundColor: isActive ? "#ffebcd" : "transparent",
                })}
              >
                <i className="fas fa-list-alt mr-2"></i> Danh Mục
              </NavLink>
            </li>
            <li style={{ listStyleType: "none", marginBottom: "8px" }}>
    <NavLink
      className="list-item py-3 px-4 block hover:bg-[#f4e3d3] rounded-lg transition-all duration-300"
      to="/admin/productlist"
      style={({ isActive }) => ({
        color: isActive ? "#91614f" : "#4b3f33",
        fontWeight: isActive ? "bold" : "normal",
        backgroundColor: isActive ? "#ffebcd" : "transparent",
      })}
    >
      <i className="fas fa-plus-circle mr-2"></i> Thêm Sản Phẩm
    </NavLink>
  </li>
  <li style={{ listStyleType: "none", marginBottom: "8px" }}>
    <NavLink
      className="list-item py-3 px-4 block hover:bg-[#f4e3d3] rounded-lg transition-all duration-300"
      to="/admin/allproductslist"
      style={({ isActive }) => ({
        color: isActive ? "#91614f" : "#4b3f33",
        fontWeight: isActive ? "bold" : "normal",
        backgroundColor: isActive ? "#ffebcd" : "transparent",
      })}
    >
      <i className="fas fa-th-large mr-2"></i> Tất Cả Sản Phẩm
    </NavLink>
  </li>
  <li style={{ listStyleType: "none", marginBottom: "8px" }}>
    <NavLink
      className="list-item py-3 px-4 block hover:bg-[#f4e3d3] rounded-lg transition-all duration-300"
      to="/admin/userlist"
      style={({ isActive }) => ({
        color: isActive ? "#91614f" : "#4b3f33",
        fontWeight: isActive ? "bold" : "normal",
        backgroundColor: isActive ? "#ffebcd" : "transparent",
      })}
    >
      <i className="fas fa-users mr-2"></i> Quản Lý Người Dùng
    </NavLink>
  </li>
  <li style={{ listStyleType: "none", marginBottom: "8px" }}>
    <NavLink
      className="list-item py-3 px-4 block hover:bg-[#f4e3d3] rounded-lg transition-all duration-300"
      to="/admin/orderlist"
      style={({ isActive }) => ({
        color: isActive ? "#91614f" : "#4b3f33",
        fontWeight: isActive ? "bold" : "normal",
        backgroundColor: isActive ? "#ffebcd" : "transparent",
      })}
    >
      <i className="fas fa-box-open mr-2"></i> Quản Lý Đơn Hàng
    </NavLink>
  </li>
          </>
        ) : (
          <>
            {/* User-specific links */}
            <Link to="/" className="flex items-center transition-transform transform hover:translate-x-2">
              <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">Trang Chủ</span>
            </Link>
            <Link to="/shop" className="flex items-center transition-transform transform hover:translate-x-2">
              <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">Cửa Hàng</span>
            </Link>
            <Link to="/cart" className="flex relative">
              <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">Giỏ Hàng</span>
              {cartItems.length > 0 && (
                <span className="absolute top-9 px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>
            <Link to="/favorite" className="flex relative">
              <FaHeart className="mt-[3rem] mr-2" size={20} />
              <span className="hidden nav-item-name mt-[3rem]">Yêu Thích</span>
            </Link>
          </>
        )}
      </div>


      <ProfileDropdown />


      {!userInfo && (
        <ul>
          <li>
            <Link to="/login" className="flex items-center mt-5 transition-transform transform hover:translate-x-2 text-[#91614f]">
              <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
              <span className="hidden nav-item-name">Đăng Nhập</span>
            </Link>
          </li>
          <li>
            <Link to="/register" className="flex items-center mt-5 transition-transform transform hover:translate-x-2 text-[#91614f]">
              <AiOutlineUserAdd size={26} />
              <span className="hidden nav-item-name">Đăng Ký</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;

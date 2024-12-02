import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";  // Default redirect

  useEffect(() => {
    if (userInfo) {
      // Kiểm tra nếu người dùng là admin
      if (userInfo.isAdmin) {
        navigate("/admin/dashboard");  // Dẫn đến trang admin dashboard nếu là admin
      } else {
        navigate(redirect);  // Dẫn đến trang mặc định nếu không phải admin
      }
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res })); // Lưu thông tin người dùng vào Redux
      if (res.isAdmin) {
        navigate("/admin/dashboard");  // Nếu là admin, chuyển hướng vào trang admin
      } else {
        navigate(redirect);  // Nếu không phải admin, chuyển hướng về trang mặc định
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <section className="pl-[10rem] flex flex-wrap min-h-auto">
      <div className="mr-[4rem] mt-[5rem] bg-[#f3e1e1] p-8 rounded-xl shadow-lg w-full md:w-[50%]">
        <h1 className="text-3xl text-center font-semibold mb-4 text-[#57413c]">Đăng nhập</h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">
              Địa chỉ email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-[#cfe6b8] text-black px-4 py-2 rounded cursor-pointer my-[1rem] hover:bg-[#b0d197] block mx-auto"
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
          </button>

          {isLoading && <Loader />}
        </form>

        <div className="mt-4">
          <p className="text-black">
            Bạn chưa có tài khoản?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="text-pink-500 hover:underline"
            >
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;

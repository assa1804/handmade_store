import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
<div className="container mx-auto p-4 mt-[10rem] bg-[#FEF4EB]">
  <div className="flex justify-center align-center md:flex md:space-x-4">
    <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-[#565853]">Cập Nhật Hồ Sơ</h2>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block text-[#565853] mb-2">Tên</label>
          <input
            type="text"
            placeholder="Enter name"
            className="form-input p-4 rounded-sm w-full bg-[#F3E1E1] border-2 border-[#91614F]"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-[#565853] mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="form-input p-4 rounded-sm w-full bg-[#F3E1E1] border-2 border-[#91614F]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-[#565853] mb-2">Mật Khẩu</label>
          <input
            type="password"
            placeholder="Enter password"
            className="form-input p-4 rounded-sm w-full bg-[#F3E1E1] border-2 border-[#91614F]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-[#565853] mb-2">Nhập Lại Mật Khẩu</label>
          <input
            type="password"
            placeholder="Confirm password"
            className="form-input p-4 rounded-sm w-full bg-[#F3E1E1] border-2 border-[#91614F]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-[#94c6c4] text-white py-2 px-4 rounded hover:bg-[#91614f]"
          >
            Cập Nhật
          </button>

          {!userInfo.isAdmin && (
            <Link
              to="/user-orders"
              className="bg-[#91614F] text-white py-2 px-4 rounded hover:bg-[#91614f]"
            >
              Đơn Hàng Của Tôi
            </Link>
          )}
        </div>
        {loadingUpdateProfile && <Loader />}
      </form>
    </div>
  </div>
</div>


  );
};

export default Profile;

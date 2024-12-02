

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-red-500">404</h1>
        <p className="text-xl text-gray-700 mt-4">Trang không tìm thấy</p>
        <p className="mt-2 text-gray-600">Rất tiếc, trang bạn tìm không tồn tại hoặc đã bị xóa.</p>
      </div>
    </div>
  );
};


export default NotFoundPage;

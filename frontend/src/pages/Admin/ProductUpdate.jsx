import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const AdminProductUpdate = () => {
  const params = useParams();

  const { data: productData, isLoading: productLoading } = useGetProductByIdQuery(params._id);
  const { data: categories = [], isLoading: categoriesLoading } = useFetchCategoriesQuery();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");

  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  // Đổ dữ liệu cũ vào form khi dữ liệu sản phẩm tải xong
  useEffect(() => {
    if (productData) {
      setName(productData?.name || "");
      setDescription(productData?.description || "");
      setPrice(productData?.price || "");
      setCategory(productData?.category?._id || "");
      setQuantity(productData?.quantity || "");
      setBrand(productData?.brand || "");
      setImage(productData?.image || "");
      setStock(productData?.countInStock || "");
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Hình ảnh đã được tải lên thành công!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setImage(res.image);
    } catch (err) {
      toast.error("Tải hình ảnh thất bại!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const data = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else {
        toast.success(`Sản phẩm đã được cập nhật thành công!`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Cập nhật sản phẩm thất bại. Vui lòng thử lại.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" đã được xóa.`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Xóa sản phẩm thất bại. Vui lòng thử lại.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0] bg-[#fef4eb] p-6">

        <div className="ml-[15rem] d:w-4/4 p-6 bg-[#fef4eb] shadow-lg rounded-lg">
          <div className="text-2xl font-semibold text-[#565853] mb-6">
            Cập Nhật/ Xóa Sản Phẩm
          </div>

          {productLoading || categoriesLoading ? (
            <div>Đang tải dữ liệu...</div>
          ) : (
            <>
              {image && (
                <div className="text-center mb-6">
                  <img
                    src={image}
                    alt="product"
                    className="block mx-auto w-[150px] h-[150px] object-cover rounded-lg border-4 border-[#94c6c4] bg-white"
                  />
                </div>
              )}

              <div className="mb-6">
                <label className="text-[#565853] py-2 px-4 block w-full text-center rounded-lg cursor-pointer font-bold bg-[#94c6c4] hover:bg-[#91614f]">
                  {image ? image.name : "Tải lên hình ảnh"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={uploadFileHandler}
                    className="text-transparent"
                  />
                </label>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="p-3">
                  <div className="flex flex-wrap mb-6">
                    <div className="w-full sm:w-1/2 lg:w-1/3 pr-6 mb-4">
                      <label htmlFor="name" className="text-[#565853]">
                        Tên
                      </label>
                      <input
                        type="text"
                        className="p-4 mb-3 w-full border rounded-lg bg-white text-black focus:outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="w-full sm:w-1/2 lg:w-1/3 mb-4">
                      <label htmlFor="price" className="text-[#565853]">
                        Giá
                      </label>
                      <input
                        type="number"
                        className="p-4 mb-3 w-full border rounded-lg bg-white text-black focus:outline-none"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap mb-6">
                    <div className="w-full sm:w-1/2 lg:w-1/3 pr-6 mb-4">
                      <label htmlFor="quantity" className="text-[#565853]">
                        Số lượng
                      </label>
                      <input
                        type="number"
                        min="1"
                        className="p-4 mb-3 w-full border rounded-lg bg-white text-black focus:outline-none"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>

                    <div className="w-full sm:w-1/2 lg:w-1/3 mb-4">
                      <label htmlFor="brand" className="text-[#565853]">
                        Tag
                      </label>
                      <input
                        type="text"
                        className="p-4 mb-3 w-full border rounded-lg bg-white text-black focus:outline-none"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="description" className="text-[#565853]">
                      Mô tả
                    </label>
                    <textarea
                      className="p-4 mb-3 w-full border rounded-lg bg-white text-black focus:outline-none"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-wrap mb-6">
                    <div className="w-full sm:w-1/2 lg:w-1/3 pr-6 mb-4">
                      <label htmlFor="stock" className="text-[#565853]">
                        Kho
                      </label>
                      <input
                        type="text"
                        className="p-4 mb-3 w-full border rounded-lg bg-white text-black focus:outline-none"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                      />
                    </div>

                    <div className="w-full sm:w-1/2 lg:w-1/3 mb-4">
                      <label htmlFor="category" className="text-[#565853]">
                        Danh mục
                      </label>
                      <select
                        className="p-4 mb-3 w-full border rounded-lg bg-white text-black focus:outline-none"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                      >
                        <option value="">Chọn danh mục</option>
                        {categories.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#94c6c4] rounded-lg text-white font-bold hover:bg-[#91614f]"
                    >
                      Cập nhật
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="px-6 py-3 bg-red-500 rounded-lg text-white font-bold hover:bg-red-700"
                    >
                      Xóa sản phẩm
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

  );
};

export default AdminProductUpdate;

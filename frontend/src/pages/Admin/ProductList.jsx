import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Lỗi.");
      } else {
        toast.success(`Thêm sản phẩm ${data.name} thành công`);
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-auto p-6 bg-[#f3e1e1] rounded-lg shadow-lg ml-[10rem] ">
          <div className="text-center text-[#565853] font-semibold text-2xl mb-6">Thêm Sản Phẩm</div>

          {imageUrl && (
            <div className="text-center mb-5">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[150px] max-w-[150px] rounded-lg border-4 border-[#91614f]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-[#565853] px-4 py-3 block w-full text-center rounded-lg cursor-pointer font-bold bg-[#94c6c4]">
              {image ? image.name : "Tải Ảnh"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap gap-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-[#565853] mb-2">Tên</label>
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col ml-10">
                <label htmlFor="name" className="text-[#565853] mb-2">Giá</label>
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="1"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex flex-col">
                <label htmlFor="quantity" className="text-[#565853] mb-2">Số Lượng</label>
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                        min="0"
                />
              </div>
              <div className="flex flex-col ml-10">
                <label htmlFor="brand" className="text-[#565853] mb-2">Tag</label>
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="description" className="text-[#565853] my-5">Mô Tả</label>
            <textarea
              type="text"
              className="p-2 mb-3 bg-white text-black border rounded-lg w-[100%]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex justify-between gap-6">
              <div className="flex flex-col">
                <label htmlFor="stock" className="text-[#565853] mb-2">Số Lượng Trong Kho</label>
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                        min="0"
                />
              </div>

<div className="flex flex-col">
  <label htmlFor="category" className="text-[#565853] mb-2">Danh Mục</label>
  <select
    placeholder="Choose Category"
    className="p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black"
    onChange={(e) => setCategory(e.target.value)}
    value={category}  // Sử dụng value để giữ trạng thái
  >
    <option value="">Chọn Danh Mục</option> {/* Thêm option mặc định */}
    {categories?.map((c) => (
      <option key={c._id} value={c._id}>
        {c.name}
      </option>
    ))}
  </select>
</div>

            </div>

<button
  onClick={handleSubmit}
  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-[#91614f] text-white hover:bg-[#565853] transition duration-300 mx-auto block"
>
Thêm Sản Phẩm
</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

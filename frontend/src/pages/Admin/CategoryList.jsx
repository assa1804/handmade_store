import { useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";

import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Nhập tên danh mục");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`Thêm danh mục ${result.name} thành công.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi, thử lại sau.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Điền tên danh mục ");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Đã xóa danh mục ${result.name}.`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi.");
    }
  };

  return (
<div className="ml-[30rem] flex flex-col md:flex-col space-y-6 mr-[30rem]">
  <AdminMenu />
  
{/* Form thêm danh mục (nằm trên) */}
<div className="md:w-auto p-6 bg-[#fef4eb] shadow-lg rounded-lg mb-6">
  <div className="text-2xl font-semibold text-[#565853] mb-6">Quản Lý Danh Mục</div>
  <CategoryForm
    value={name}
    setValue={setName}
    handleSubmit={handleCreateCategory}
    buttonText="Thêm Danh Mục"
  />
</div>

{/* Dòng phân cách */}
<hr className="my-6 border-[#91614f]" />

{/* Danh sách danh mục (nằm dưới) */}
<div className="md:w-full p-6 bg-[#fef4eb] shadow-lg rounded-lg mt-6">
  <div className="text-xl font-semibold text-[#565853] mb-4">
    Danh Sách Danh Mục
  </div>

  {/* Bảng hiển thị danh mục */}
  <table className="min-w-full bg-white table-auto border-separate border-spacing-2">
    <thead>
      <tr>
        <th className="text-left py-2 px-4 bg-[#94c6c4] text-[#565853] rounded-tl-lg">Tên Danh Mục</th>
        <th className="text-left py-2 px-4 bg-[#94c6c4] text-[#565853]"></th>
      </tr>
    </thead>
    <tbody>
      {categories?.map((category) => (
        <tr key={category._id} className="hover:bg-[#f3e1e1]">
          <td className="py-2 px-4 text-[#565853]">{category.name}</td>
          <td className="py-2 px-4 text-[#565853]">
            <button
              className="bg-[#94c6c4] text-[#565853] py-2 px-4 rounded-lg hover:bg-[#91614f] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#91614f] focus:ring-opacity-50"
              onClick={() => {
                setModalVisible(true);
                setSelectedCategory(category);
                setUpdatingName(category.name);
              }}
            >
              Chọn
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


  {/* Modal Cập Nhật Danh Mục */}
  <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
    <CategoryForm
      value={updatingName}
      setValue={setUpdatingName}
      handleSubmit={handleUpdateCategory}
      buttonText="Cập Nhật"
      handleDelete={handleDeleteCategory}
    />
  </Modal>
</div>

  );
};

export default CategoryList;
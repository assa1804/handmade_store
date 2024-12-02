import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";

const TopProducts = () => {
  const { data, isLoading } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="mt-[3rem] ml-[13rem] flex flex-wrap gap-2">
      {data.map((product) => (
        <div
          key={product._id}
          className="transform transition-all duration-200 hover:scale-105 hover:shadow-sm p-2 bg-white rounded-md border border-gray-200"
        >
          <SmallProduct product={product} />
        </div>
      ))}
    </section>
  );
};

export default TopProducts;

import { useSearchParams } from "react-router-dom";
import useProductStore from "../store/useProductStore";
import ProductComponent from "../components/product/ProductComponent";

const SearchPage = () => {
  const [params] = useSearchParams();
  const query = params.get("q")?.toLowerCase() || "";
  const { products } = useProductStore();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">
        Search results for: <span className="text-blue-600">{query}</span>
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductComponent key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;

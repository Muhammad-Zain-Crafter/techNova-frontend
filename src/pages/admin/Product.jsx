import { useEffect, useState } from "react";
import API from "../../api/axios";
import Loader from "../../components/common/Loader";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    id: "",
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/api/v1/productStore/products/products");
      setProducts(res.data.data || []);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await API.delete(
        `/api/v1/productStore/products/delete-product/${id}`
      );
      toast.success("Product deleted");
      fetchProducts();
    } catch {
      toast.error("Failed to delete product");
    }
  };
  const openEdit = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      await API.put(
        `/api/v1/productStore/products/update-product/${selectedProduct.id}`,
        {
          name: selectedProduct.name,
          price: selectedProduct.price,
          image: selectedProduct.image,
          description: selectedProduct.description,
          category: selectedProduct.category,
        }
      );
      toast.success("Product updated");
      setShowModal(false);
      fetchProducts();
    } catch {
      toast.error("Failed to update product");
    }
  };
  if (loading) return <Loader />;
  return (
    <main className="min-h-screen bg-[#030712] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black mb-10">
          Manage <span className="text-cyan-400">Products</span>
        </h1>
        <div className="overflow-x-auto rounded-2xl border border-[#182235]">
          <table className="w-full">
            <thead className="bg-[#081120]">
              <tr>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-center">Actions</th>
              </tr>

            </thead>

            <tbody>

              {products.map((product) => (

                <tr
                  key={product.id}
                  className="border-t border-[#182235]"
                >

                  <td className="p-4">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />

                  </td>

                  <td className="p-4">

                    <h3 className="font-semibold">
                      {product.name}
                    </h3>

                    <p className="text-gray-400 text-sm">
                      {product.description?.slice(0,60)}...
                    </p>

                  </td>

                  <td className="p-4">
                    {product.category}
                  </td>

                  <td className="p-4 text-cyan-400 font-bold">
                    Rs. {Number(product.price).toLocaleString()}
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => openEdit(product)}
                        className="bg-cyan-500 hover:bg-cyan-400 p-3 rounded-lg"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-600 hover:bg-red-500 p-3 rounded-lg"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

          <div className="bg-[#081120] rounded-2xl border border-[#182235] w-full max-w-2xl p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-xl md:text-2xl font-bold mb-8">
              Edit Product
            </h2>

            <div className="space-y-2">

              <input
                value={selectedProduct.name}
                onChange={(e)=>
                  setSelectedProduct({
                    ...selectedProduct,
                    name:e.target.value
                  })
                }
                placeholder="Product Name"
                className="w-full bg-[#030712] border border-[#182235] rounded-xl p-3"
              />

              <input
                value={selectedProduct.price}
                onChange={(e)=>
                  setSelectedProduct({
                    ...selectedProduct,
                    price:e.target.value
                  })
                }
                placeholder="Price"
                className="w-full bg-[#030712] border border-[#182235] rounded-xl p-3"
              />

              <input
                value={selectedProduct.category}
                onChange={(e)=>
                  setSelectedProduct({
                    ...selectedProduct,
                    category:e.target.value
                  })
                }
                placeholder="Category"
                className="w-full bg-[#030712] border border-[#182235] rounded-xl p-3"
              />

              <input
                value={selectedProduct.image}
                onChange={(e)=>
                  setSelectedProduct({
                    ...selectedProduct,
                    image:e.target.value
                  })
                }
                placeholder="Image URL"
                className="w-full bg-[#030712] border border-[#182235] rounded-xl p-3"
              />

              <textarea
                rows={5}
                value={selectedProduct.description}
                onChange={(e)=>
                  setSelectedProduct({
                    ...selectedProduct,
                    description:e.target.value
                  })
                }
                className="w-full bg-[#030712] border border-[#182235] rounded-xl p-3"
              />

              <button
                onClick={handleUpdate}
                className="w-full py-3 rounded-xl bg-cyan-400 text-black font-bold hover:bg-cyan-300"
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
};

export default Product;
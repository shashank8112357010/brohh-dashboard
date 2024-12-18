import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { SyncLoader } from "react-spinners";
import NoData from "@/components/NoData";
import axios from "axios";
import { GetProductService, PostProductService } from "@/services/api.service";

export function Products() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    sizes: [],
    colors: [],
    fabric: "",
    category: "",
    images: [],
    ratings: ""
  });
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get("/api/products");
  //       setProducts(response.data.products);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchProducts();
  // }, []);


  const fetchProducts = async () => {
    setLoading(true)
    await GetProductService().then((res) => {
      setProducts(res?.data?.data)
      setLoading(false)
    }).catch((err) => {
      console.log(err);
      setLoading(false)
    })
  }

  const handleFileChange = (e) => {
    setProductData({ ...productData, images: Array.from(e.target.files) });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "sizes" || name === "colors") {
      setProductData({ ...productData, [name]: value.split(",").map((item) => item.trim()) });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(productData).forEach((key) => {
      if (key === "images") {
        productData.images.forEach((file) => formData.append("images", file));
      } else if (key === "sizes" || key === "colors") {
        formData.append(key, JSON.stringify(productData[key])); // Ensure arrays are stringified for correct server processing
      } else {
        formData.append(key, productData[key]);
      }
    });

    try {
      setLoading(true);
      await PostProductService(formData)
        .then((res) => {
          console.log(res);

          fetchProducts()
          setIsFormVisible(false)
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
      setLoading(false);
    } catch (error) {
      console.error("Error uploading product:", error);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProducts()
  }, [])


  const showForm = () => {
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Products
          </Typography>
        </CardHeader>

        <div className="flex w-full justify-end pb-0">
          <Button
            variant="text"
            onClick={showForm}
            className="bg-[#212121] text-white mr-4 mb-4 text-lg py-2 px-4 hover:bg-white hover:text-[#212121] border-2 hover:border-[#212121]"
          >
            Add Product
          </Button>
        </div>

        <CardBody className="px-0 pt-0 pb-2">
          {isLoading ? (
            <div className="flex items-center justify-center h-52 p-3">
              <SyncLoader color="#000" size={15} />
            </div>
          ) : products.length === 0 ? (
            <NoData />
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr>
                  {[
                    "Name",
                    "Description",
                    "Price",
                    "Sizes",
                    "Colors",
                    "Fabric",
                    "Category",
                    "Ratings",
                    "Actions"
                  ].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product, key) => (
                  <tr key={product._id}>
                    <td className="py-3 px-5">{product.name}</td>
                    <td className="py-3 px-5" title={product.description}>{product.description.length > 10 ? `${product.description.slice(0, 19)}...` : product.description}</td>
                    <td className="py-3 px-5">${product.price}</td>
                    <td className="py-3 px-5">{product.sizes.join(", ")}</td>
                    <td className="py-3 px-5">{product.colors.join(", ")}</td>
                    <td className="py-3 px-5">{product.fabric}</td>
                    <td className="py-3 px-5">{product.category}</td>
                    <td className="py-3 px-5">{product.ratings}</td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2">
                        <PencilIcon className="h-4 w-4 text-gray-600 cursor-pointer" />
                        <TrashIcon className="h-4 w-4 text-red-500 cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>

      {isFormVisible && (
        <Modal title="Add Product" closeForm={closeForm} isFormVisible={isFormVisible}>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={productData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={productData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={productData.price}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="sizes" className="block text-sm font-medium text-gray-700">
                Sizes (comma-separated)
              </label>
              <input
                type="text"
                name="sizes"
                id="sizes"
                value={productData.sizes.join(", ")}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="colors" className="block text-sm font-medium text-gray-700">
                Colors (comma-separated)
              </label>
              <input
                type="text"
                name="colors"
                id="colors"
                value={productData.colors.join(", ")}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fabric" className="block text-sm font-medium text-gray-700">
                Fabric
              </label>
              <input
                type="text"
                name="fabric"
                id="fabric"
                value={productData.fabric}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                id="category"
                value={productData.category}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                <option value="">Select a category</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="ratings" className="block text-sm font-medium text-gray-700">
                Ratings (out of 5)
              </label>
              <input
                type="number"
                name="ratings"
                id="ratings"
                value={productData.ratings}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                min="0"
                max="5"
                step="0.1"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                Product Images
              </label>
              <input
                type="file"
                name="images"
                id="images"
                onChange={handleFileChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                multiple
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

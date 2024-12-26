import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Dialog,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";
import NoData from "../../components/NoData";
import { DeleteProductService, GetCategoryService, GetProductService, GetSubcategoriesServiceByCategoryId, PostCategoryService, PostProductService, UpdateProductService } from "@/services/api.service";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const Products = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    ratings: 0,
    price: "",
    sizes: [],
    colors: [],
    fabric: "",
    category: "",
    subcategory: "",
    images: [],
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await GetProductService();
      setProducts(response.data.data);
    } catch (error) {
      dispatch({ type: "SHOW_POPUP", payload: { type: "error", message: "Failed to fetch products" } });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await GetCategoryService();
      setCategories(response.data?.categories);
    } catch (error) {
      dispatch({ type: "SHOW_POPUP", payload: { type: "error", message: "Failed to fetch categories" } });
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await GetSubcategoriesServiceByCategoryId(categoryId);
      setSubCategories(response.data?.data);
    } catch (error) {
      dispatch({ type: "SHOW_POPUP", payload: { type: "error", message: "Failed to fetch subcategories" } });
    }
  };


  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Check if the number of files selected is exactly 3
    if (files.length !== 3) {
      dispatch({
        type: "SHOW_POPUP",
        payload: { type: "error", message: "Please select exactly 3 images." },
      });
      return;
    }

    // Validate file size and type
    const validFiles = files.filter((file) => file.size <= 2 * 1024 * 1024); // Max 2MB size
    if (validFiles.length !== files.length) {
      dispatch({
        type: "SHOW_POPUP",
        payload: { type: "error", message: "Some files exceed size limit or have an invalid type." },
      });
    }

    setNewProduct({ ...newProduct, images: validFiles });
  };

  const handleCreate = async () => {
    if (newProduct.images.length < 1 || newProduct.images.length > 3) {
      return dispatch({
        type: "SHOW_POPUP",
        payload: { type: "error", message: "Please upload 1-3 images." },
      });
    }

    // Create FormData to send product details
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("ratings", newProduct.ratings);
    formData.append("fabric", newProduct.fabric);
    formData.append("category", newProduct.category);
    formData.append("subcategory", newProduct.subcategory);
    formData.append("sizes", newProduct.sizes.join(","));
    formData.append("colors", newProduct.colors.join(","));

    // Append images to FormData
    newProduct.images.forEach((image, index) => formData.append(`images`, image));

    try {
      await PostProductService(formData); // Make the API call with FormData
      dispatch({ type: "SHOW_POPUP", payload: { type: "success", message: "Product created successfully!" } });
      fetchProducts();
      setOpenCreate(false);
    } catch (error) {
      dispatch({
        type: "SHOW_POPUP",
        payload: { type: "error", message: error.response?.data?.message || "Failed to create product" },
      });
    }
  };

  const handleEdit = async () => {
    // Create FormData to send updated product details
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("ratings", newProduct.ratings);
    formData.append("fabric", newProduct.fabric);
    formData.append("category", newProduct.category);
    formData.append("subcategory", newProduct.subcategory);
    formData.append("sizes", newProduct.sizes.join(","));
    formData.append("colors", newProduct.colors.join(","));

    // Append images to FormData
    if (newProduct.images.length > 0) {
      newProduct.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }

    try {
      await UpdateProductService(selectedProduct.id, formData); // Make the API call with FormData
      dispatch({ type: "SHOW_POPUP", payload: { type: "success", message: "Product updated successfully!" } });
      fetchProducts();
      setOpenEdit(false);
    } catch (error) {
      dispatch({
        type: "SHOW_POPUP",
        payload: { type: "error", message: error.response?.data?.message || "Failed to update product" },
      });
    }
  };



  const handleDelete = async () => {
    try {
      await DeleteProductService(selectedProduct._id);
      dispatch({ type: "SHOW_POPUP", payload: { type: "success", message: "Product deleted successfully!" } });
      fetchProducts();
      setOpenDelete(false);
    } catch (error) {
      dispatch({
        type: "SHOW_POPUP",
        payload: { type: "error", message: error.response?.data?.message || "Failed to delete product" },
      });
    }
  };



  const resetForm = () => {
    setNewProduct({
      name: "",
      description: "",
      ratings: 0,
      price: "",
      sizes: [],
      colors: [],
      fabric: "",
      category: "",
      subcategory: "",
      images: []
    });
  };

  const renderProducts = useMemo(() => {
    console.log(products , "products");
    if (products.length === 0) return <NoData message="No products available" />;

    return (
      <table className="min-w-full table-auto ">
        <thead>
          <tr className="border-b border-blue-gray-50">
            <th className="py-3 px-5 text-xs font-bold text-black">Name</th>
            <th className="py-3 px-5 text-xs font-bold text-black">Description</th>
            <th className="py-3 px-5 text-xs font-bold text-black">Price</th>
            <th className="py-3 px-5 text-xs font-bold text-black">Ratings</th>
            <th className="py-3 px-5 text-xs font-bold text-black">Fabric</th>
            <th className="py-3 px-5 text-xs font-bold text-black">Category</th>
            <th className="py-3 px-5 text-xs font-bold text-black">Subcategory</th>
            <th className="py-3 px-5 text-xs font-bold text-black">Images</th>
            <th className="py-3 px-5 text-xs font-bold text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product._id} className="border-b border-blue-gray-50">
              <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">{product.name}</td>
              <td className="py-3 px-5 text-xs font-medium text-blue-gray-600" title={product.description}>
                {product.description.length > 10 ? `${product.description.slice(0, 19)}...` : product.description}
              </td>
              <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">${product.price}</td>
              <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">{product.ratings} / 5</td>
              <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">{product.fabric} </td>

              <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">{product.category.name}</td>
              <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">{product.subcategory.name}</td>
              <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">
                <img
                  src={product.images[0]}
                  alt="Product"
                  className="h-10 w-10 rounded cursor-pointer"
                  onClick={() => openImageModal(product.images)}
                />
              </td>
              <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">
                <div className="flex items-center gap-2">
                  <PencilIcon
                    className="h-4 w-4 text-gray-600 cursor-pointer"
                  // onClick={() => openEditModal(product)} // Open the edit modal when clicked
                  />
                  <TrashIcon
                    className="h-4 w-4 text-red-500 cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(product); // Set the product to delete
                      setOpenDelete(true); // Open the delete modal
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }, [products]);



  return (
    <div className="p-6">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <div className="flex justify-between items-center">
            <Typography variant="h6" color="white">
              Products
            </Typography>
            <Button color="green" onClick={() => { resetForm(); setOpenCreate(true); }}>
              Add New Product
            </Button>
          </div>
        </CardHeader>

        <CardBody className="overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center w-full">
              <SyncLoader />
            </div>
          ) : renderProducts}
        </CardBody>
      </Card>

      {/* Create Product Modal */}
      <Dialog open={openCreate} handler={() => setOpenCreate(false)} size="sm">
        <div className=" p-4 flex flex-col gap-4">
          <Typography variant="h6">Create Product</Typography>
          <Input label="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          <Input label="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
          <Input label="Price" value={newProduct.price} type="number" onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
          <Input max={5} min={1} label="Ratings" value={newProduct.ratings} type="number" onChange={(e) => setNewProduct({ ...newProduct, ratings: e.target.value })} />
          <Input label="Fabric" value={newProduct.fabric} onChange={(e) => setNewProduct({ ...newProduct, fabric: e.target.value })} />
          <Select label="Category" onChange={(e) => { setNewProduct({ ...newProduct, category: e }); fetchSubCategories(e); }}>
            {categories.map((cat) => <Option key={cat._id} value={cat._id}>{cat.name}</Option>)}
          </Select>
          <Select label="Subcategory" onChange={(e) => setNewProduct({ ...newProduct, subcategory: e })}>
            {subCategories.map((sub) => <Option key={sub._id} value={sub._id}>{sub.name}</Option>)}
          </Select>
          <Input label="Sizes (comma-separated)" value={newProduct.sizes.join(", ")} onChange={(e) => setNewProduct({ ...newProduct, sizes: e.target.value.split(",") })} />
          <Input label="Colors (comma-separated)" value={newProduct.colors.join(", ")} onChange={(e) => setNewProduct({ ...newProduct, colors: e.target.value.split(",") })} />
          <Input

            type="file"
            multiple
            onChange={handleFileChange}
          />
          <Typography variant="small" className="mt-2 text-gray-500">
            Please upload exactly 3 images (each up to 2MB).
          </Typography>
          <Button className="" onClick={handleCreate}>Create</Button>
        </div>
      </Dialog>

      {/* Edit Product Modal */}
      <Dialog open={openEdit} handler={() => setOpenEdit(false)} size="sm">
        <div className="p-4">
          <Typography variant="h6">Edit Product</Typography>
          <Input label="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          <Input label="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
          <Input label="Price" value={newProduct.price} type="number" onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
          <Input label="Ratings" value={newProduct.ratings} type="number" onChange={(e) => setNewProduct({ ...newProduct, ratings: e.target.value })} />
          <Input label="Fabric" value={newProduct.fabric} onChange={(e) => setNewProduct({ ...newProduct, fabric: e.target.value })} />
          <Select label="Category" onChange={(e) => { setNewProduct({ ...newProduct, category: e }); fetchSubCategories(e); }}>
            {categories.map((cat) => <Option key={cat._id} value={cat._id}>{cat.name}</Option>)}
          </Select>
          <Select label="Subcategory" onChange={(e) => setNewProduct({ ...newProduct, subcategory: e })}>
            {subCategories.map((sub) => <Option key={sub._id} value={sub._id}>{sub.name}</Option>)}
          </Select>
          <Input label="Sizes (comma-separated)" value={newProduct.sizes.join(", ")} onChange={(e) => setNewProduct({ ...newProduct, sizes: e.target.value.split(",") })} />
          <Input label="Colors (comma-separated)" value={newProduct.colors.join(", ")} onChange={(e) => setNewProduct({ ...newProduct, colors: e.target.value.split(",") })} />
          <Input type="file" multiple onChange={handleFileChange} />
          <Button onClick={handleEdit}>Update</Button>
        </div>
      </Dialog>

      {/* Delete Product Modal */}
      <Dialog open={openDelete} handler={() => setOpenDelete(false)} size="xs">
        <div className="p-4">
          <Typography>Are you sure you want to delete this product?</Typography>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
            <Button color="red" onClick={handleDelete}>Delete</Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Products;

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
  Chip,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";
import NoData from "../../components/NoData";
import { DeleteProductService, GetCategoryService, GetProductService, GetSubcategoriesServiceByCategoryId, PostProductService, UpdateProductService, UpdateStockProductService, UpdateTrendingProductService } from "@/services/api.service";
import { PencilIcon, TrashIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

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
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
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
    discount: null
  });


  const sizeOptions = ["S", "M", "L", "XL", "XXL", "32", "34", "36", "38", "40", "42", "46"];

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const openImageModal = (images) => {
    setCurrentImages(images);
    setImageModalOpen(true);
  };



  // Add this new effect to load subcategories when selected product changes
  useEffect(() => {
    if (selectedProduct && selectedProduct.category._id) {
      fetchSubCategories(selectedProduct.category._id);
    }
  }, [selectedProduct]);

  const handleEditClick = (product) => {
    console.log(product);
    setSelectedProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      ratings: product.ratings,
      price: product.price,
      sizes: product.sizes[0].split(',').map((i)=>i.trim()) || [],
      colors: product.colors || [],
      fabric: product.fabric,
      category: product.category._id,
      subcategory: product.subcategory._id,
      images: product.images || [],
    });
    setOpenEdit(true);
    // Remove fetchSubCategories from here since it's now handled by the useEffect
  };




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
    const maxFileSize = 3 * 1024 * 1024; // 3MB
  

  
    // Validate file size
    const validFiles = files.filter((file) => file.size <= maxFileSize);
  
    if (validFiles.length !== files.length) {
      dispatch({
        type: "SHOW_POPUP",
        payload: { type: "error", message: "Some files exceed the 3MB size limit." },
      });
      return;
    }
  
    // Update state with new images
    setNewProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles],
    }));
  };
  

  const handleCreate = async () => {
    if (newProduct.images.length < 1 || newProduct.images.length > 3) {
      return dispatch({
        type: "SHOW_POPUP",
        payload: { type: "error", message: "Please upload 1-3 images." },
      });
    }

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("discount", newProduct.discount);

    formData.append("price", newProduct.price);
    formData.append("ratings", newProduct.ratings);
    formData.append("fabric", newProduct.fabric);
    formData.append("category", newProduct.category);
    formData.append("subcategory", newProduct.subcategory);
    formData.append("sizes", newProduct.sizes.join(","));
    formData.append("colors", newProduct.colors.join(","));

    newProduct.images.forEach((image, index) => formData.append(`images`, image));

    try {
      await PostProductService(formData);
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

    const existingImages = [];
      const newImages = [];
     console.log(newProduct);
      newProduct.images.forEach((image) => {
        if (typeof image === 'string') {
          
          existingImages.push(image); // Collect existing image URLs
          console.log(existingImages , "existingImages");
        } else {
          console.log(image , "image after upload ");
          newImages.push(image); // Collect new image files
        }
      });

      // Ensure existingImages is always sent as an array
      if (existingImages.length > 0) {
        formData.append('existingImages', (existingImages));
      }

      newImages.forEach((image) => {
        formData.append('images', image);
      });



    try {
      await UpdateProductService(selectedProduct._id, formData);
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

  const handleMultiSelectChange = (value) => {
    setNewProduct((prevData) => ({
      ...prevData,
      sizes: [...prevData.sizes, value]
    }))

  };

  const handleRemoveSize = (sizeToRemove) => {
    setNewProduct((prevData) => ({
      ...prevData,
      sizes: prevData.sizes.filter(size => size !== sizeToRemove)
    }));
  };

  const handleRemoveImage = (index) => {
    setNewProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const renderProducts = useMemo(() => {
    if (products.length === 0) return <NoData message="No products available" />;

    return (
      <table className="min-w-full table-auto ">
        <thead>
          <tr className="border-b border-blue-gray-50">
            <th className="py-3 text-left px-5 text-xs font-bold text-black">Name</th>
            <th className="py-3 text-left  px-5 text-xs font-bold text-black">Description</th>
            <th className="py-3 text-left  px-5 text-xs font-bold text-black">Discount</th>

            <th className="py-3 text-left  px-5 text-xs font-bold text-black">Price</th>
            <th className="py-3  text-left px-5 text-xs font-bold text-black">Ratings</th>
            <th className="py-3  text-left px-5 text-xs font-bold text-black">Fabric</th>
            <th className="py-3 text-left px-5 text-xs font-bold text-black">Category</th>
            <th className="py-3  text-left px-5 text-xs font-bold text-black">Subcategory</th>
            <th className="py-3  text-left px-5 text-xs font-bold text-black">Stock</th>
            <th className="py-3  text-left px-5 text-xs font-bold text-black">Trending</th>


            <th className="py-3 text-left  px-5 text-xs font-bold text-black">Images</th>
            <th className="py-3  text-left px-5 text-xs font-bold text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product._id} className="border-b border-blue-gray-50">
              <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">{product.name}</td>
              <td className="py-3 px-5 text-xs font-medium text-blue-gray-600" title={product.description}>

                {product.description.length > 10 ? `${product.description.slice(0, 50)}...` : product.description}
              </td>
              <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">${`${product.discount || 0}%`}</td>

              <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">${product.price}</td>
              <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">{product.ratings} / 5</td>
              <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">{product.fabric} </td>
              <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">{product.category.name}</td>
              <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">{product.subcategory.name}</td>
              <td className="py-3 px-5 text-xs font-medium text-blue-gray-600 cursor-pointer"
                onClick={async () => {
                  await UpdateStockProductService(product._id, { available: !product.inStock }).then((res) => {
                    fetchProducts();
                  }).catch((err) => {

                  })
                }}
              >
                {product.inStock ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircleIcon className="h-5 w-5 text-red-500" />
                )}

              </td>
              <td className="py-3 px-5 text-xs font-medium text-blue-gray-600 cursor-pointer"
                onClick={async () => {
                  await UpdateTrendingProductService(product._id, { trending: !product.trending }).then((res) => {
                    fetchProducts();
                  }).catch((err) => {

                  })
                }}
              >
                {product.trending ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircleIcon className="h-5 w-5 text-red-500" />
                )}

              </td>


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
                    className="h-5 w-5 text-gray-600 cursor-pointer"
                    onClick={() => handleEditClick(product)}
                  />
                  <TrashIcon
                    className="h-5 w-5 text-red-500 cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(product);
                      setOpenDelete(true);
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
      <Dialog open={openCreate} handler={() => setOpenCreate(false)} size="sm" className="">
        <div className=" p-4 flex flex-col gap-4">
          <Typography variant="h6">Create Product</Typography>
          <Input label="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          <Input label="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
          <Input label="Discount" type="number" value={newProduct.discount} onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })} />

          <Input label="Price" value={newProduct.price} type="number" onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
          <Input max={5} min={1} label="Ratings" value={newProduct.ratings} type="number" onChange={(e) => setNewProduct({ ...newProduct, ratings: e.target.value })} />
          <Input label="Fabric" value={newProduct.fabric} onChange={(e) => setNewProduct({ ...newProduct, fabric: e.target.value })} />
          <select
            value={newProduct.category}
            onChange={(e) => {
              setNewProduct({ ...newProduct, category: e.target.value });
              fetchSubCategories(e.target.value);
            }}
            className="border text-sm border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={newProduct.subcategory}
            onChange={(e) =>
              setNewProduct({ ...newProduct, subcategory: e.target.value })
            }
            className="border text-sm border-gray-300 rounded-md p-2 w-full mt-2"
          >
            <option value="">Select Subcategory</option>
            {subCategories.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>

          <Select
            label="Sizes"
            multiple
            value={newProduct.sizes}
            onChange={handleMultiSelectChange}
          >
            {sizeOptions.map((size) => (
              <Option key={size} value={size}>{size}</Option>
            ))}
          </Select>
          <div className="flex flex-wrap gap-2">
            {newProduct.sizes.map((size) => (
              <Chip key={size} value={size} onClose={() => handleRemoveSize(size)} />
            ))}
          </div>

          <Input label="Colors (comma-separated)" value={newProduct.colors.join(", ")} onChange={(e) => setNewProduct({ ...newProduct, colors: e.target.value.split(",").map(s => s.trim()) })} />
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
        <div className="p-4 flex flex-col gap-4">
          <Typography variant="h6">Edit Product</Typography>
          <Input label="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          <Input label="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
          <Input label="Price" value={newProduct.price} type="number" onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
          <Input max={5} min={1} label="Ratings" value={newProduct.ratings} type="number" onChange={(e) => setNewProduct({ ...newProduct, ratings: e.target.value })} />
          <Input label="Fabric" value={newProduct.fabric} onChange={(e) => setNewProduct({ ...newProduct, fabric: e.target.value })} />
          <select
            className="w-full p-2 border border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-grey-600"
            value={newProduct.category}
            onChange={(e) => {
              setNewProduct({ ...newProduct, category: e.target.value });
              fetchSubCategories(e.target.value);
            }}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            className="w-full p-2 border border-gray-500 rounded-md text-sm mt-2 focus:outline-none focus:ring-2 focus:ring-grey-600"
            value={newProduct.subcategory}
            onChange={(e) => setNewProduct({ ...newProduct, subcategory: e.target.value })}
          >
            <option value="">Select Subcategory</option>
            {subCategories.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>


          <Select
            label="Sizes"
            multiple
            value={newProduct.sizes}
            onChange={handleMultiSelectChange}
          >
            {sizeOptions.map((size) => (
              <Option key={size} value={size}>{size}</Option>
            ))}
          </Select>
          <div className="flex flex-wrap gap-2">
            {newProduct.sizes.map((size) => (
              <Chip key={size} value={size} onClose={() => handleRemoveSize(size)} />
            ))}
          </div>

          <Input label="Colors (comma-separated)" value={newProduct.colors.join(", ")} onChange={(e) => setNewProduct({ ...newProduct, colors: e.target.value.split(",").map(s => s.trim()) })} />
          <div className="space-y-2">
            <Typography variant="small" className="text-blue-gray-500">
              Product Images (Max: 3 images)
            </Typography>
            <div className="flex gap-3 flex-wrap">
              {/* Display Existing Images with Remove Option */}
              {newProduct.images.map((image, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                    alt={`Product ${idx + 1}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full"
                    onClick={() => handleRemoveImage(idx)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Upload New Images */}
            {newProduct.images.length < 3 && (
              <>
                <Input
                  label="Upload Images"
                  name="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
                <Typography variant="small" className="text-blue-gray-500">
                  You can upload up to {3 - newProduct.images.length} more image(s), each less than 1MB.
                </Typography>
              </>
            )}
          </div>





          <div className="flex justify-end gap-2">
            <Button color="gray" onClick={() => setOpenEdit(false)}>Cancel</Button>
            <Button color="blue" onClick={handleEdit}>Update</Button>
          </div>
        </div>
      </Dialog>

      {/* Delete Product Modal */}
      <Dialog open={openDelete} handler={() => setOpenDelete(false)} size="md">
        <div className="p-6">
          <Typography variant="h6" className="mb-4">Delete Product</Typography>
          <Typography>Are you sure you want to delete this product?</Typography>
          <div className="flex justify-end space-x-2 mt-4">
            <Button color="gray" size="sm" onClick={() => setOpenDelete(false)}>Cancel</Button>
            <Button color="red" size="sm" onClick={handleDelete}>Delete</Button>
          </div>
        </div>
      </Dialog>

      {/* Image Preview Modal */}
      <Dialog open={imageModalOpen} handler={() => setImageModalOpen(false)} size="md">
        <div className="p-4">
          <Typography variant="h6" className="mb-4">
            Product Images
          </Typography>
          <div className="grid grid-cols-3 gap-4">
            {currentImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Image ${index + 1}`}
                className="h-40 w-full object-cover rounded"
              />
            ))}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Products;
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from '@material-tailwind/react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import { SyncLoader } from 'react-spinners';
import {
  GetCategoryService,
  DeleteCategoryService,
  PostCategoryService,
} from '@/services/api.service';
import { setPopup } from '@/store/slice/dashboardSlice';
import { useDispatch } from 'react-redux';

export function Category() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const dispatch = useDispatch();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await GetCategoryService();
      setCategories(response?.data?.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      dispatch(
        setPopup({
          message: 'Failed to fetch categories, please try again.',
          type: 'error',
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async () => {
    if (!newCategoryName.trim()) {
      dispatch(
        setPopup({
          message: 'Category name cannot be empty.',
          type: 'error',
        })
      );
      return;
    }

    try {
      await PostCategoryService({ name: newCategoryName });
      dispatch(
        setPopup({
          message: 'Category added successfully.',
          type: 'success',
        })
      );
      setAddModalVisible(false);
      setNewCategoryName('');
      fetchCategories();
    } catch (error) {
      console.error('Error adding category:', error);
      dispatch(
        setPopup({
          message: 'Failed to add category, please try again.',
          type: 'error',
        })
      );
    }
  };

  const deleteCategory = async () => {
    try {
      await DeleteCategoryService(categoryToDelete);
      dispatch(
        setPopup({
          message: 'Category deleted successfully.',
          type: 'success',
        })
      );
      fetchCategories();
      setDeleteModalVisible(false); // Close the delete modal
    } catch (error) {
      console.error('Error deleting category:', error);
      dispatch(
        setPopup({
          message: 'Failed to delete category, please try again.',
          type: 'error',
        })
      );
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <div className="flex justify-between items-center">
              <Typography variant="h6" color="white">
                Category
              </Typography>
              <Button color="green" onClick={() => setAddModalVisible(true)}>
                Add Category
              </Button>
            </div>
          </CardHeader>

          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            {isLoading ? (
              <div className="flex items-center justify-center h-52 p-3">
                <SyncLoader color="#000" size={15} />
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-10">
                <Typography variant="h6" color="gray">
                  No Categories Found
                </Typography>
              </div>
            ) : (
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {['Id', 'Name', 'Actions'].map((el) => (
                      <th
                        key={el}
                        className={`border-b border-blue-gray-50 py-3 px-5 text-left ${el === 'Actions' && 'px-12'}`}
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
                  {categories.map((category, key) => {
                    const className = `py-3 px-5 ${key === categories.length - 1
                        ? ''
                        : 'border-b border-blue-gray-50'
                      }`;

                    return (
                      <tr key={category._id}>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-sm font-medium text-blue-gray-600"
                          >
                            {category._id}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-sm font-medium text-blue-gray-600"
                          >
                            {category.name}
                          </Typography>
                        </td>
                        <td className={className}>
                          {/* <Button
                            variant="text"
                            color="red"
                            className="flex items-center gap-2"
                            onClick={() => {
                              setCategoryToDelete(category._id);
                              setDeleteModalVisible(true);
                            }}
                          >
                            <TrashIcon className="h-4 w-4" />
                            Delete
                          </Button> */}

                          <IconButton
                           className="flex  ml-7 items-center gap-2"
                            color="red"
                            size="sm"
                            onClick={() => {
                              setCategoryToDelete(category._id);
                              setDeleteModalVisible(true);
                            }}
                          >
                            <TrashIcon className="h-5 w-5" />
                          </IconButton>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Add Category Modal */}
      <Dialog open={addModalVisible} handler={setAddModalVisible}>
        <DialogHeader>Add New Category</DialogHeader>
        <DialogBody divider>
          <input
            type="text"
            placeholder="Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setAddModalVisible(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button color="green" onClick={addCategory}>
            Add Category
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Delete Category Confirmation Modal */}
      <Dialog open={deleteModalVisible} handler={setDeleteModalVisible}>
        <DialogHeader>Delete Category</DialogHeader>
        <DialogBody divider>
          <Typography>Are you sure you want to delete this category?</Typography>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setDeleteModalVisible(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button color="green" onClick={deleteCategory}>
            Yes, Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Category;

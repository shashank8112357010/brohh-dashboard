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
  Select,
  Option,
  IconButton,
} from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import {
  GetCategoryService,
  GetSubCategoryService,
  PostSubCategoryService,
  DeleteSubCategoryService,
} from '@/services/api.service';
import { setPopup } from '@/store/slice/dashboardSlice';
import { useDispatch } from 'react-redux';
import { TrashIcon } from '@heroicons/react/24/solid';

export function SubCategory() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [subCategoryToDelete, setSubCategoryToDelete] = useState(null);
  const [newSubCategory, setNewSubCategory] = useState({ name: '', categoryId: '' });
  const dispatch = useDispatch();

  const fetchCategories = async () => {
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
    }
  };

  const fetchSubCategories = async () => {
    setLoading(true);
    try {
      const response = await GetSubCategoryService();
      setSubCategories(response?.data?.data || []);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      dispatch(
        setPopup({
          message: 'Failed to fetch subcategories, please try again.',
          type: 'error',
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const addSubCategory = async () => {
    const { name, categoryId } = newSubCategory;
    if (!name.trim() || !categoryId) {
      dispatch(
        setPopup({
          message: 'Both subcategory name and category must be selected.',
          type: 'error',
        })
      );
      return;
    }

    try {
      await PostSubCategoryService(newSubCategory);
      dispatch(
        setPopup({
          message: 'Subcategory added successfully.',
          type: 'success',
        })
      );
      setModalVisible(false);
      setNewSubCategory({ name: '', categoryId: '' });
      fetchSubCategories();
    } catch (error) {
      console.error('Error adding subcategory:', error);
      dispatch(
        setPopup({
          message: 'Failed to add subcategory, please try again.',
          type: 'error',
        })
      );
    }
  };

  const deleteSubCategory = async () => {
    try {
      await DeleteSubCategoryService(subCategoryToDelete);
      dispatch(
        setPopup({
          message: 'Subcategory deleted successfully.',
          type: 'success',
        })
      );
      setDeleteModalVisible(false);
      setSubCategoryToDelete(null);
      fetchSubCategories();
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      dispatch(
        setPopup({
          message: 'Failed to delete subcategory, please try again.',
          type: 'error',
        })
      );
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <div className="flex justify-between items-center">
              <Typography variant="h6" color="white">
                Sub-Category
              </Typography>
              <Button color="green" onClick={() => setModalVisible(true)}>
                Add Sub-Category
              </Button>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            {isLoading ? (
              <div className="flex items-center justify-center h-52 p-3">
                <Typography variant="h6" color="gray">
                  Loading...
                </Typography>
              </div>
            ) : subCategories.length === 0 ? (
              <div className="text-center py-10">
                <Typography variant="h6" color="gray">
                  No Sub-Categories Found
                </Typography>
              </div>
            ) : (
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {[ "Id" , 'Sub-Category', 'Category', 'Actions'].map((el) => (
                      <th
                        key={el}
                        className={`border-b border-blue-gray-50 py-3 px-5 text-left ${el === "Actions" && 'px-12'}`}
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
                {console.log(subCategories , "subCategories")}
                <tbody>
                  {subCategories.map(({ _id, name, category }, key) => {
                    const className = `py-3 px-5 ${key === subCategories.length - 1
                        ? ''
                        : 'border-b border-blue-gray-50'
                      }`;

                    return (
                      <tr key={_id}>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-sm font-medium text-blue-gray-600"
                          >
                            {_id}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-sm font-medium text-blue-gray-600"
                          >
                            {name}
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
                        <td className={className }>
                          {/* <Button
                            variant="text"
                            color="red"
                            className="flex items-center gap-2"
                            onClick={() => {
                              setSubCategoryToDelete(_id);
                              setDeleteModalVisible(true);
                            }}
                          >
                            Delete
                          </Button> */}

                          <IconButton
                           className="flex  ml-7 items-center gap-2"
                            color="red"
                            size="sm"
                            onClick={() => {
                              setSubCategoryToDelete(_id);
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

      {/* Add Sub-Category Modal */}
      <Dialog open={modalVisible} handler={setModalVisible}>
        <DialogHeader>Add New Sub-Category</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Sub-Category Name"
              value={newSubCategory.name}
              onChange={(e) =>
                setNewSubCategory({ ...newSubCategory, name: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Select
              label="Select Category"
              value={newSubCategory.categoryId}
              onChange={(value) =>
                setNewSubCategory({ ...newSubCategory, categoryId: value })
              }
            >
              {categories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setModalVisible(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button color="green" onClick={addSubCategory}>
            Add Sub-Category
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalVisible} handler={setDeleteModalVisible}>
        <DialogHeader>Confirm Deletion</DialogHeader>
        <DialogBody divider>
          Are you sure you want to delete this subcategory? This action cannot be undone.
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
          <Button color="green" onClick={deleteSubCategory}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default SubCategory;

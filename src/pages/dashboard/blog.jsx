import React, { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button
} from '@material-tailwind/react'
import { GetBlogsService, DeleteBlogsService } from '@/services/api.service'
import { SyncLoader } from 'react-spinners'
import { BlogModal } from '@/components/BlogModal'
import { TrashIcon } from '@heroicons/react/24/outline'

export function Blogs() {
  const [blogs, setBlogs] = useState([])

  const [loading, setLoading] = useState(true)
  const [isDeleting , setDeleting] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedBlogId, setSelectedBlogId] = useState(null)

  // Function to fetch blogs
  const fetchBlogs = () => {
    setLoading(true) // Show loader during the fetch
    GetBlogsService()
      .then((res) => {
        setBlogs(res.data?.data || []) // Assuming `res.data` contains the array of blogs
      })
      .catch((err) => {
        console.error('Error fetching blogs:', err)
     
      })
      .finally(() => {
        setLoading(false) // Hide loader after the fetch
      })
  }

  // Function to delete a blog
  const deleteBlog = async() => {
    setDeleting(true)
    if (!selectedBlogId) return
   await DeleteBlogsService(selectedBlogId)
      .then(() => {
        setDeleting(false)
        setDeleteModalOpen(false) // Close the modal
        setSelectedBlogId(null) // Reset selected blog
        fetchBlogs() // Refresh the blog list
      })
      .catch((err) => {
        setDeleting(false)
      
        setDeleteModalOpen(false) // Close the modal
      })
  }

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, [])

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Blogs
            </Typography>
          </CardHeader>
          <div className="px-4 my-5 flex justify-end">
            <BlogModal fetchBlogs={fetchBlogs} />
          </div>

          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <SyncLoader color="#000" size={15} />
              </div>
            )  : blogs?.length > 0 ? (
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {['Title', 'Image', 'Description', 'Posted On', 'Actions'].map(
                      (header) => (
                        <th
                          key={header}
                          className="border-b border-blue-gray-50 py-3 px-5 text-left"
                        >
                          <Typography
                            variant="small"
                            className="text-[11px] font-bold uppercase text-blue-gray-400"
                          >
                            {header}
                          </Typography>
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {blogs.map(
                    ({ _id, title, description, postedOn, image }, key) => {
                      const className = `py-3 px-5 ${
                        key === blogs.length - 1
                          ? ''
                          : 'border-b border-blue-gray-50'
                      }`

                      return (
                        <tr key={_id}>
                          <td className={className}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {title}
                            </Typography>
                          </td>
                          <td className={className}>
                            <img
                              src={image}
                              alt={title}
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="text-xs font-medium"
                            >
                              {description}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="text-xs font-medium"
                            >
                              {new Date(postedOn).toLocaleDateString()}
                            </Typography>
                          </td>
                          <td className={className}>
                            <IconButton
                              color="red"
                              onClick={() => {
                                setSelectedBlogId(_id)
                                setDeleteModalOpen(true)
                              }}
                            >
                              <TrashIcon className="h-5 w-5" />
                            </IconButton>
                          </td>
                        </tr>
                      )
                    }
                  )}
                </tbody>
              </table>
            ) : (
              <Typography variant="small" color="blue-gray">
                No blogs found.
              </Typography>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={deleteModalOpen}
        handler={setDeleteModalOpen}
        size="sm"
        className="max-w-sm"
      >
        <DialogHeader>Confirm Deletion</DialogHeader>
        <DialogBody divider>
          Are you sure you want to delete this blog? This action cannot be
          undone.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="blue-gray"
            disabled={isDeleting}
            onClick={() => setDeleteModalOpen(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            variant="gradient"
            color="red"
            disabled={isDeleting}
            onClick={deleteBlog}
          >
            {
              isDeleting ? <SyncLoader color="#fff" size={6} /> : "Confirm"
            }
           
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default Blogs

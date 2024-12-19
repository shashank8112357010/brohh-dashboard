import React, { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip
} from '@material-tailwind/react'
import { GetBlogsService } from '@/services/api.service'
import { SyncLoader } from 'react-spinners'
import { BlogModal } from '@/components/BlogModal'

export function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  // Function to fetch blogs
  const fetchBlogs = () => {
    setLoading(true) // Show loader during the fetch
    GetBlogsService()
      .then((res) => {
        console.log(res)
        setBlogs(res.data?.data || []) // Assuming `res.data` contains the array of blogs
      })
      .catch((err) => {
        console.error('Error fetching blogs:', err)
        setError('Failed to fetch blogs. Please try again later.')
      })
      .finally(() => {
        setLoading(false) // Hide loader after the fetch
      })
  }

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs()
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
            ) : error ? (
              <Typography variant="small" color="red">
                {error}
              </Typography>
            ) : blogs?.length > 0 ? (
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {['Title', 'Image', 'Description', 'Posted On'].map(
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
    </>
  )
}

export default Blogs

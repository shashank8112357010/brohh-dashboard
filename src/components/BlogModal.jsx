import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography
} from '@material-tailwind/react'
import { PostBlogsService } from '@/services/api.service'
import { SyncLoader } from 'react-spinners'
import { useDispatch } from 'react-redux'
import { setPopup } from '@/store/slice/dashboardSlice'

export function BlogModal({ btnText = 'Add Blog', fetchBlogs }) {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleOpen = () => setOpen(!open)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.size > 1024 * 1024) {
      // Image size validation: 1 MB
      setError('Image size must be under 1 MB.')
      return
    }
    setError('')
    setFormData((prev) => ({ ...prev, image: file }))
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.image) {
      setError('All fields are required.')
      return
    }

    setLoading(true)
    const dataToSend = new FormData()
    dataToSend.append('title', formData.title)
    dataToSend.append('description', formData.description)
    dataToSend.append('image', formData.image)

    await PostBlogsService(dataToSend)
      .then((res) => {
        console.log('Blog created successfully:', res)
        fetchBlogs() // Callback to refresh the blogs list
        handleOpen() // Close modal
        setFormData({ title: '', description: '', image: null }) // Reset form
        dispatch(
          setPopup({ message: 'Blogs Added Successfully', type: 'success' })
        )
      })
      .catch((err) => {
        console.error('Failed to post blog:', err)
        dispatch(
          setPopup({
            message: 'Failed to create blog. Please try again.',
            type: 'error'
          })
        )
        // setError("Failed to create blog. Please try again.");
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        {btnText}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add a New Blog</DialogHeader>
        <DialogBody>
          <div className="space-y-4">
            <Input
              type="text"
              label="Blog Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            <Textarea
              label="Blog Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            <Input
              type="file"
              label="Upload Image"
              onChange={handleFileChange}
              required
            />
            {error && (
              <Typography variant="small" color="red">
                {error}
              </Typography>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
            disabled={loading}
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <SyncLoader color="#4A90E2" size={4} />
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

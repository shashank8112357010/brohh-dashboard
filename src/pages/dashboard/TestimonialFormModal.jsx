import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input
} from '@material-tailwind/react'
import SyncLoader from 'react-spinners/SyncLoader'
import { PostTestimonialService } from '@/services/api.service' // Ensure the correct path to your API service
import { setPopup } from '@/store/slice/dashboardSlice'
import { useDispatch } from 'react-redux'

export function TestimonialFormModal({ getTestimonial }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false);
  const [image , setImage] = useState('')
  const dispatch = useDispatch()

  const handleOpen = () => setOpen(!open)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.size > 1024 * 1024) {
      alert("size will be under 1 mb")
    }
   
    setImage(file)
  }

  const handleSubmit = () => {
    setLoading(true)
    const data = { name, message , image }
    const dataToSend = new FormData()

    dataToSend.append('name',data.name )
    dataToSend.append('message', data.message)
    dataToSend.append('image', data.image)

    PostTestimonialService(dataToSend)
      .then(() => {
        // alert("Testimonial submitted successfully!"); // Replace with your success notification
        handleOpen()
        setName('')
        setMessage('')
        getTestimonial();
        setImage("")
        dispatch(
          setPopup({
            message: 'testimonial created successfully',
            type: 'success'
          })
        )
      })
      .catch((error) => {
        console.error('Error submitting testimonial:', error)
        dispatch(
          setPopup({
            message: 'Failed to create testimonial. Please try again.',
            type: 'error'
          })
        )
        // alert("Failed to submit testimonial. Please try again."); // Replace with your error notification
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Add Testimonial
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add Testimonial</DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
           <Input
              type="file"
              label="Upload Image"
              onChange={handleFileChange}
              required
            />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="8"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
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
            color="black"
            onClick={handleSubmit}
            disabled={loading || !name || !message}
          >
            {loading ? <SyncLoader size={8} color="#fff" /> : 'Submit'}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default TestimonialFormModal

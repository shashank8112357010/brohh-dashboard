import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography
} from '@material-tailwind/react'
import { PostStyleService } from '@/services/api.service'
import { setPopup } from '@/store/slice/dashboardSlice'
import { useDispatch } from 'react-redux'

export function StyleFormModal({
  btnText,
  title,
  influencers,
  onStyleCreated
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    influencerId: []
  })
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  const handleOpen = () => setOpen(!open)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file.size > 1024 * 1024) {
      setError('Image size must be under 1 MB')
      return
    }
    setError('')
    setFormData((prev) => ({ ...prev, image: file }))
  }

  const handleInfluencerChange = (id) => {
    setFormData((prev) => {
      const selected = prev.influencerId.includes(id)
        ? prev.influencerId.filter((infId) => infId !== id)
        : [...prev.influencerId, id]
      return { ...prev, influencerId: selected }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.image) {
      setError('Please upload a valid image under 1 MB.')
      return
    }

    setLoading(true)
    const formDataToSend = new FormData()
    formDataToSend.append('style_name', formData.name)
    formDataToSend.append('image', formData.image)
    formDataToSend.append('influencerId', JSON.stringify(formData.influencerId))

    try {
      await PostStyleService(formDataToSend)
        .then((res) => {
          console.log(res)
          onStyleCreated() // Callback to refresh styles list
          handleOpen() // Close modal
          setFormData({ name: '', image: null, influencerId: [] }) // Reset form
          dispatch(
            setPopup({ message: 'Style created successfully', type: 'success' })
          )
        })
        .catch((err) => {
          console.log(err)
          dispatch(
            setPopup({
              message: 'Failed to create style. Please try again.',
              type: 'error'
            })
          )
        })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        {btnText}
      </Button>
      <Dialog open={open} handler={handleOpen} className="">
        <DialogHeader>{title}</DialogHeader>
        <DialogBody>
          <div className="space-y-4">
            <Input
              type="text"
              label="Style Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <Input
              type="file"
              label="Style Image"
              onChange={handleFileChange}
            />
            {error && (
              <Typography variant="small" className="text-red-500">
                {error}
              </Typography>
            )}
            <div>
              <Typography variant="small" className="text-gray-600 mb-2">
                Select Influencers:
              </Typography>
              <div className="border rounded p-2">
                {influencers.map((influencer) => (
                  <div
                    key={influencer._id}
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => handleInfluencerChange(influencer._id)}
                  >
                    <input
                      type="checkbox"
                      checked={formData.influencerId.includes(influencer._id)}
                      onChange={() => handleInfluencerChange(influencer._id)}
                    />
                    <label>{influencer.name}</label>
                  </div>
                ))}
              </div>
            </div>
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
            {loading ? <span>Submitting...</span> : <span>Submit</span>}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

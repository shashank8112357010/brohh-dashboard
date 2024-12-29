import React, { useState, useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography
} from '@material-tailwind/react'
import { SyncLoader } from 'react-spinners'
import {
  PostInfluencerService,
  FetchProductIdsService
} from '@/services/api.service'
import { setPopup } from '@/store/slice/dashboardSlice'
import { useDispatch } from 'react-redux'

export function InfluencerModal({ fetchAllInfluencers }) {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [productLoading, setProductLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    instagramHandle: '',
    productIds: [],
    image: null
  })
  const [productIds, setProductIds] = useState([])
  const [error, setError] = useState('')

  const handleOpen = () => setOpen(!open)

  // Fetch Product IDs with their name and image
  useEffect(() => {
    setProductLoading(true)
    FetchProductIdsService()
      .then((res) => {
        console.log("ids--------" ,res );
        setProductIds(res.data.data || [])
      })
      .catch((err) => {
        console.error('Error fetching product IDs:', err)
        setError('Failed to fetch product IDs.')
      })
      .finally(() => {
        setProductLoading(false)
      })
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }))
  }

  const handleProductSelection = (productId) => {
    setFormData((prev) => {
      const isSelected = prev.productIds.includes(productId)
      return {
        ...prev,
        productIds: isSelected
          ? prev.productIds.filter((id) => id !== productId)
          : [...prev.productIds, productId]
      }
    })
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required.')
      return false
    }
    if (!formData.instagramHandle.trim()) {
      setError('Instagram handle is required.')
      return false
    }
    if (formData.productIds.length === 0) {
      setError('At least one product ID must be selected.')
      return false
    }
    if (!formData.image) {
      setError('Image is required.')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name)
    formDataToSend.append('instagramHandle', formData.instagramHandle)
    formDataToSend.append('productIds', JSON.stringify(formData.productIds))
    formDataToSend.append('image', formData.image)

    setLoading(true)
    PostInfluencerService(formDataToSend)
      .then(() => {
        handleOpen()
        fetchAllInfluencers()
        dispatch(
          setPopup({
            message: 'Influencer created successfully',
            type: 'success'
          })
        )
        setFormData({
          name: '',
          instagramHandle: '',
          productIds: [],
          image: null
        })
      })
      .catch((err) => {
        // console.error("Error submitting influencer:", err);
        // setError("Failed to submit influencer.");
        dispatch(
          setPopup({
            message: 'Failed to create Influencer. Please try again.',
            type: 'error'
          })
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Add Influencer
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add New Influencer</DialogHeader>
        <DialogBody>
          {productLoading ? (
            <div className="flex justify-center">
              <SyncLoader color="#36D7B7" size={10} />
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                type="text"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                label="Instagram Handle"
                name="instagramHandle"
                value={formData.instagramHandle}
                onChange={handleInputChange}
              />
              <Input type="file" label="Image" onChange={handleFileChange} />
              <Typography variant="small" className="mb-2 text-gray-600">
                Select Product IDs:
              </Typography>

              {/* Custom Dropdown */}
              <div className="relative">
                <div className="overflow-y-auto max-h-48 border border-gray-300 rounded-lg">
                  {productIds.map((product) => (
                    <div
                      key={product?._id}
                      className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        id={`product-${product?._id}`}
                        value={product?._id}
                        checked={formData.productIds.includes(product?._id)}
                        onChange={() => handleProductSelection(product?._id)}
                        className="form-checkbox"
                      />
                      <label
                        htmlFor={`product-${product?._id}`}
                        className="flex items-center gap-2"
                      >
                        <img
                          src={product?.images[0]}
                          alt={product.name}
                          className="w-8 h-8 object-cover"
                        />
                        <Typography variant="small">{product.name}</Typography>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {error && (
                <Typography variant="small" color="red">
                  {error}
                </Typography>
              )}
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
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
              <SyncLoader color="#fff" size={6} />
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default InfluencerModal

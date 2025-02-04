import React, { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input
} from '@material-tailwind/react'
import { getBannerService, deleteBannerService, postBannerService } from '@/services/api.service'
import { SyncLoader } from 'react-spinners'
import { TrashIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/24/solid'

export function Banner() {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDeleting, setDeleting] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [selectedBannerId, setSelectedBannerId] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)

  // Function to fetch banners
  const fetchBanners = () => {
    setLoading(true)
    getBannerService()
      .then((res) => {
        setBanners(res.data?.banners || [])
      })
      .catch((err) => {
        console.error('Error fetching banners:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // Function to delete a banner
  const deleteBanner = async () => {
    setDeleting(true)
    if (!selectedBannerId) return
    await deleteBannerService(selectedBannerId)
      .then(() => {
        setDeleting(false)
        setDeleteModalOpen(false)
        setSelectedBannerId(null)
        fetchBanners()
      })
      .catch((err) => {
        console.error('Error deleting banner:', err)
        setDeleting(false)
        setDeleteModalOpen(false)
      })
  }

  // Function to upload a new banner
  const uploadBanner = async () => {
    if (!image) return alert('Please select an image')

    setUploading(true)
    const formData = new FormData()
    formData.append('image', image)

    try {
      await postBannerService(formData)
      setUploadModalOpen(false)
      setImage(null)
      fetchBanners()
    } catch (error) {
      console.error('Error uploading banner:', error)
    } finally {
      setUploading(false)
    }
  }

  // Fetch banners on component mount
  useEffect(() => {
    fetchBanners()
  }, [])

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Banners
            </Typography>
          </CardHeader>
          <div className="px-4 my-5 flex justify-end">
            <Button color="green" onClick={() => setUploadModalOpen(true)} className="flex items-center gap-2">
              <PlusIcon className="h-5 w-5" />
              Add Banner
            </Button>
          </div>

          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <SyncLoader color="#000" size={15} />
              </div>
            ) : banners?.length > 0 ? (
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {['Image', 'Uploaded On', 'Actions'].map((header) => (
                      <th key={header} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                        <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                          {header}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {banners.map(({ _id, image, createdAt }, key) => {
                    const className = `py-3 px-5 ${key === banners.length - 1 ? '' : 'border-b border-blue-gray-50'}`

                    return (
                      <tr key={_id}>
                        <td className={className}>
                          <img
                            src={image}
                            alt="Banner"
                            className="h-12 w-32 rounded-lg object-cover cursor-pointer hover:opacity-80 transition"
                            onClick={() => {
                              setSelectedImage(image)
                              setImageModalOpen(true)
                            }}
                          />
                        </td>
                        <td className={className}>
                          <Typography variant="small" color="blue-gray" className="text-xs font-medium">
                            {new Date(createdAt).toLocaleDateString()}
                          </Typography>
                        </td>
                        <td className={className}>
                          <IconButton
                            color="red"
                            onClick={() => {
                              setSelectedBannerId(_id)
                              setDeleteModalOpen(true)
                            }}
                          >
                            <TrashIcon className="h-5 w-5" />
                          </IconButton>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              <Typography variant="small" color="blue-gray">
                No banners found.
              </Typography>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} handler={setDeleteModalOpen} size="sm" className="max-w-sm">
        <DialogHeader>Confirm Deletion</DialogHeader>
        <DialogBody divider>
          Are you sure you want to delete this banner? This action cannot be undone.
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="blue-gray" disabled={isDeleting} onClick={() => setDeleteModalOpen(false)} className="mr-2">
            Cancel
          </Button>
          <Button variant="gradient" color="red" disabled={isDeleting} onClick={deleteBanner}>
            {isDeleting ? <SyncLoader color="#fff" size={6} /> : 'Confirm'}
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Upload Banner Modal */}
      <Dialog open={uploadModalOpen} handler={setUploadModalOpen} size="sm" className="max-w-sm">
        <DialogHeader>Upload Banner</DialogHeader>
        <DialogBody divider>
          <div className="mb-4">
            <Typography variant="small" color="blue-gray">
              Select an image to upload as a banner.
            </Typography>
          </div>
          <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="blue-gray" disabled={uploading} onClick={() => setUploadModalOpen(false)} className="mr-2">
            Cancel
          </Button>
          <Button variant="gradient" color="green" disabled={uploading} onClick={uploadBanner}>
            {uploading ? <SyncLoader color="#fff" size={6} /> : 'Upload'}
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Image Preview Modal */}
      <Dialog open={imageModalOpen} handler={setImageModalOpen} size="lg">
        <DialogHeader>Banner Preview</DialogHeader>
        <DialogBody divider>
          {selectedImage && <img src={selectedImage} alt="Banner Preview" className="w-full rounded-lg" />}
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="blue-gray" onClick={() => setImageModalOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default Banner

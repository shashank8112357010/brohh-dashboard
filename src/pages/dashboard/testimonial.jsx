import React, { useEffect, useState } from 'react'
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
  IconButton
} from '@material-tailwind/react'
import { SyncLoader } from 'react-spinners'
import { TestimonialFormModal } from './TestimonialFormModal'
import { GetTestimonialService, DeleteTestimonialService } from '@/services/api.service'
import { TrashIcon } from '@heroicons/react/24/solid'

export function Testimonial() {
  const [testimonials, setTestimonials] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedTestimonialId, setSelectedTestimonialId] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const getTestimonial = async () => {
    setIsLoading(true)
    await GetTestimonialService()
      .then((res) => {
        setTestimonials(res.data.data || [])
      })
      .catch((err) => {
        console.error('Failed to fetch testimonials:', err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const deleteTestimonial = async () => {
    if (!selectedTestimonialId) return
    setIsDeleting(true)
    await DeleteTestimonialService(selectedTestimonialId)
      .then(() => {
        setDeleteModalOpen(false)
        setSelectedTestimonialId(null)
        getTestimonial() // Refresh the testimonials
      })
      .catch((err) => {
        console.error('Failed to delete testimonial:', err)
      })
      .finally(() => {
        setIsDeleting(false)
      })
  }

  useEffect(() => {
    getTestimonial()
  }, [])

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Testimonials
            </Typography>
          </CardHeader>
          <div className="px-4 my-5 flex justify-end">
            <TestimonialFormModal getTestimonial={getTestimonial} />
          </div>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <SyncLoader color="#000" size={15} />
              </div>
            ) : testimonials.length > 0 ? (
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {['Name', 'Message', 'Date', 'Actions'].map((header) => (
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
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map(({ _id, name, message, createdAt }, key) => {
                    const className = `py-3 px-5 ${key === testimonials.length - 1
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
                            {name}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-xs font-medium"
                          >
                            {message}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-xs font-medium"
                          >
                            {new Date(createdAt).toLocaleDateString()}
                          </Typography>
                        </td>
                        <td className={className}>


                          <IconButton
                            color="red"
                            size="sm"
                            onClick={() => {
                              setSelectedTestimonialId(_id)
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
              <Typography variant="small" color="blue-gray" className="text-center py-5">
                No testimonials found.
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
          Are you sure you want to delete this testimonial? This action cannot be undone.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="blue-gray"
            onClick={() => setDeleteModalOpen(false)}
            disabled={isDeleting}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={deleteTestimonial}
            disabled={isDeleting}
          >
            {isDeleting ? <SyncLoader color="#fff" size={6} /> : 'Confirm'}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default Testimonial

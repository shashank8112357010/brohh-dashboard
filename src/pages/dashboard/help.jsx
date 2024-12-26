import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Chip,
  IconButton
} from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import {
  GetHelpService,
  MarkStatusDoneHelpService,
  DeleteHelpService
} from '@/services/api.service'
import { SyncLoader } from 'react-spinners'
import { setPopup } from '@/store/slice/dashboardSlice'
import { useDispatch } from 'react-redux'
import { CheckIcon, TrashIcon } from '@heroicons/react/24/solid'

export function Help() {
  const [helpData, setHelpData] = useState([])
  const [loading, setLoading] = useState(true)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [rowIndex, setRowIndex] = useState('')
  const [deleteRowIndex, setDeleteRowIndex] = useState(null)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const dispatch = useDispatch()

  const getHelpData = async () => {
    setLoading(true)
    try {
      const res = await GetHelpService()
      setHelpData(res?.data?.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getHelpData()
  }, [])

  // Handle marking help request as resolved
  const handleMarkDelivered = async (Id, index) => {
    setRowIndex(index)
    setButtonLoading(true)
    await MarkStatusDoneHelpService(Id)
      .then(() => {
        getHelpData()
        dispatch(setPopup({ message: 'Help status updated', type: 'success' }))
      })
      .catch(() => {
        dispatch(
          setPopup({
            message: 'Failed to mark help. Please try again.',
            type: 'error'
          })
        )
      })
      .finally(() => {
        setButtonLoading(false)
      })
  }

  // Handle opening delete confirmation modal
  const handleDeleteClick = (index) => {
    setDeleteRowIndex(index)
    setDeleteModalOpen(true)
  }

  // Handle deleting help request
  const handleDelete = async () => {
    const helpId = helpData[deleteRowIndex]?._id
    if (!helpId) return

    setDeleteLoading(true)
    await DeleteHelpService(helpId)
      .then(() => {
        getHelpData()
        dispatch(setPopup({ message: 'Help request deleted', type: 'success' }))
      })
      .catch(() => {
        dispatch(
          setPopup({
            message: 'Failed to delete help request. Please try again.',
            type: 'error'
          })
        )
      })
      .finally(() => {
        setDeleteLoading(false)
        setDeleteModalOpen(false)
      })
  }

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12 min-h-screen">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Help
            </Typography>
          </CardHeader>

          <CardBody className="px-0 pt-0 pb-2">
            {loading ? (
              <div className="flex items-center justify-center h-52 p-3">
                <SyncLoader color="#000" size={15} />
              </div>
            ) : helpData.length === 0 ? (
              <div className="text-center py-10 text-gray-600">
                <Typography>No data available.</Typography>
              </div>
            ) : (
              <div className="overflow-x-auto min-h-[65vh]">
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      {[
                        'Id',
                        'User Id',
                        'Order Id',
                        'Date',
                        'Issue',
                        'Status',
                        'Action'
                      ].map((el) => (
                        <th
                          key={el}
                          className="border-b border-blue-gray-50 py-3 px-5 text-left"
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
                    {helpData.map((help, key) => (
                      <tr
                        key={key}
                        className="hover:bg-gray-50 border-b border-blue-gray-50"
                      >
                        <td className="py-3 px-5 text-xs font-bold text-black">
                          {help._id.slice(-10)}
                        </td>
                        <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">
                          {help.userId.slice(-10)}
                        </td>
                        <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">
                          {help.orderId.slice(-10)}
                        </td>
                        <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">
                          {new Date(help.createdAt).toLocaleString(
                            'en-IN',
                            {
                              timeZone: 'Asia/Kolkata',
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            }
                          )}
                        </td>
                        <td className="py-3 px-5 text-xs font-medium text-blue-gray-600">
                          {help.issue}
                        </td>
                        <td>
                          <Chip
                            variant="gradient"
                            color={
                              help.status === 'Pending' ? 'yellow' : 'green'
                            }
                            value={
                              help.status === 'Pending'
                                ? help.status
                                : 'Completed'
                            }
                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          />
                        </td>
                        <td className="py-3 px-5 flex gap-2">
                          {help.status === 'Pending' ? (
                            <IconButton
                              color="green"
                              size='sm'
                              onClick={() => handleMarkDelivered(help._id, key)}
                              disabled={buttonLoading && key === rowIndex}
                            >
                              {buttonLoading && key === rowIndex ? (
                                <SyncLoader size={3} color="#fff" />
                              ) : (
                                <CheckIcon className="h-4 w-4" />
                              )}
                            </IconButton>
                          ) : (
                            <IconButton
                            size='sm'
                              color="red"
                              onClick={() => handleDeleteClick(key)}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </IconButton>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <Typography variant="h6" className="mb-4">
              Confirm Delete
            </Typography>
            <Typography className="mb-6 text-sm text-gray-600">
              Are you sure you want to delete this help request? This action
              cannot be undone.
            </Typography>
            <div className="flex justify-end gap-4">
              <Button
                color="red"
                variant="gradient"
                onClick={handleDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? <SyncLoader size={8} color="#fff" /> : 'Delete'}
              </Button>
              <Button
                color="gray"
                variant="text"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Help

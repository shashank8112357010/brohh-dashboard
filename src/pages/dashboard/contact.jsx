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
  Button
} from '@material-tailwind/react'
import { getContactService, deleteContactService, PutContactService } from '@/services/api.service'
import { SyncLoader } from 'react-spinners'
import { TrashIcon, CheckIcon } from '@heroicons/react/24/outline'

export function Contact() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isUpdating, setUpdating] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedContactId, setSelectedContactId] = useState(null)

  // Fetch contacts
  const fetchContacts = () => {
    setLoading(true)
    getContactService()
      .then((res) => {
        setContacts(res.data?.contacts || [])
      })
      .catch((err) => {
        console.error('Error fetching contacts:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // Delete a contact
  const deleteContact = async () => {
    if (!selectedContactId) return
    setUpdating(true)
    await deleteContactService(selectedContactId)
      .then(() => {
        setDeleteModalOpen(false)
        setSelectedContactId(null)
        fetchContacts()
      })
      .catch((err) => {
        console.error('Error deleting contact:', err)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  // Mark contact as completed
  const markAsCompleted = async (contactId) => {
    setUpdating(true)
    await PutContactService(contactId, { status: 'completed' })
      .then(() => {
        fetchContacts()
      })
      .catch((err) => {
        console.error('Error updating contact:', err)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts()
  }, [])

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Contact Messages
            </Typography>
          </CardHeader>

          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <SyncLoader color="#000" size={15} />
              </div>
            ) : contacts?.length > 0 ? (
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {['Name', 'Email', 'Message', 'Status', 'Actions'].map((header) => (
                      <th key={header} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                        <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                          {header}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {contacts.map(({ _id, name, email, message, status }, key) => {
                    const className = `py-3 px-5 ${key === contacts.length - 1 ? '' : 'border-b border-blue-gray-50'}`

                    return (
                      <tr key={_id}>
                        <td className={className}>
                          <Typography variant="small" color="blue-gray" className="text-xs font-medium">
                            {name}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography variant="small" color="blue-gray" className="text-xs font-medium">
                            {email}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography variant="small" color="blue-gray" className="text-xs font-medium">
                            {message}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className={`text-xs font-medium ${
                              status === 'completed' ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {status}
                          </Typography>
                        </td>
                        <td className={className} style={{ display: 'flex', gap: '10px' }}>
                          {status !== 'completed' && (
                            <IconButton
                              color="green"
                              onClick={() => markAsCompleted(_id)}
                              disabled={isUpdating}
                            >
                              <CheckIcon className="h-5 w-5" />
                            </IconButton>
                          )}
                          <IconButton
                            color="red"
                            onClick={() => {
                              setSelectedContactId(_id)
                              setDeleteModalOpen(true)
                            }}
                            disabled={isUpdating}
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
                No contact messages found.
              </Typography>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} handler={setDeleteModalOpen} size="sm" className="max-w-sm">
        <DialogHeader>Confirm Deletion</DialogHeader>
        <DialogBody divider>
          Are you sure you want to delete this contact message? This action cannot be undone.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="blue-gray"
            disabled={isUpdating}
            onClick={() => setDeleteModalOpen(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button variant="gradient" color="red" disabled={isUpdating} onClick={deleteContact}>
            {isUpdating ? <SyncLoader color="#fff" size={6} /> : 'Confirm'}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default Contact

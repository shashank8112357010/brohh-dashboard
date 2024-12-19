import React from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from '@material-tailwind/react'

export function DeleteModal({
  open,
  handleOpen,
  deletedName,
  handleDeleteFreelancer
}) {
  return (
    <>
      {/* <Button onClick={handleOpen} variant="gradient">
                Open Dialog
            </Button> */}
      <Dialog
        open={open}
        handler={handleOpen}
        size="sm"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 1, y: -10 }
        }}
      >
        <DialogHeader className="text-center block w-full">
          Do you wish to continue?
        </DialogHeader>
        <DialogBody className="text-center block w-full text-blue-gray-500">
          Once deleted this {deletedName?.name} profile can't be accessed again
        </DialogBody>
        <DialogFooter className="flex justify-center w-full gap-4">
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1 border-none outline-none text-black"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="gray" onClick={handleOpen}>
            <span onClick={handleDeleteFreelancer}>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

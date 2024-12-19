import React from 'react'
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter
} from '@material-tailwind/react'

export function IndividualModal({ open, handleOpen, src }) {
  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        size="sm"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 1, y: -10 }
        }}
      >
        <DialogBody className="text-center block w-full text-blue-gray-500">
          <img className="w-1/2 mx-auto" src={src} alt="" />
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
        </DialogFooter>
      </Dialog>
    </>
  )
}

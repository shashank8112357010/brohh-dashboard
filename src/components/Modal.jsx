import React, { useState } from 'react'
import { IconButton, Typography } from '@material-tailwind/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useMaterialTailwindController } from '@/context'

const Modal = ({ title, closeForm, isFormVisible, children }) => {
  const [controller, dispatch] = useMaterialTailwindController()
  const { openConfigurator, sidenavColor, sidenavType, fixedNavbar } =
    controller
  const sidenavColors = {
    white: 'from-gray-100 to-gray-100 border-gray-200',
    dark: 'from-black to-black border-gray-200',
    green: 'from-green-400 to-green-600',
    orange: 'from-orange-400 to-orange-600',
    red: 'from-red-400 to-red-600',
    pink: 'from-pink-400 to-pink-600'
  }

  return (
    <aside
      className={`fixed top-0 right-0 z-50   w-[100vw] sm:w-[30rem] bg-white px-2.5 shadow-lg transition-all duration-300
            ${isFormVisible ? 'translate-x-0' : 'translate-x-[30rem]'}`}
    >
      <div className="flex flex-col py-4 h-screen">
        <div className="flex flex-row justify-between w-full px-4 py-2">
          <div>
            <Typography variant="h5" color="blue-gray">
              {title || 'pass prop to display'}
            </Typography>
            <Typography className="font-normal text-blue-gray-600">
              {' '}
            </Typography>
          </div>
          <IconButton
            className="rounded-full text-white border-2 w-6 h-6 bg-black hover:bg-white hover:text-black"
            onClick={() => {
              closeForm()
            }}
          >
            <XMarkIcon strokeWidth={2.5} className="h-4 w-4" />
          </IconButton>
        </div>

        {children}
      </div>
    </aside>
  )
}

export default Modal

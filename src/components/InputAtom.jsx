import React from 'react'

const InputAtom = ({id ,type , placeholder , onchange}) => {
    return (
        <>
            <input
                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id={id}
                type={type}
                placeholder={placeholder}
                onChange={onchange}
            />
        </>
    )
}

export default InputAtom
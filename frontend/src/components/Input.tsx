import React from 'react'

interface InputProps {
    placeholder?: string
}

function Input() {
    return (
        <input
            type="text"
            className='w-full border-b-2 focus:border-green-600 placeholder:text-slate-300 text-slate-700 text-l font-medium mb-4 outline-none border-b-slate-300 py-2'
        />
    )
}

export default Input

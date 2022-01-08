import React from 'react'


interface ButtonPrimaryProps {
    title: string,
    disabled?: boolean,
    onClick?: () => void
}

function ButtonPrimary({ title, disabled = false, onClick }: ButtonPrimaryProps) {
    return (
        <div className={`flex flex-row items-center rounded-sm py-2 px-4 ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} transition-all cursor-pointer`} onClick={onClick}>
            <p className="text-white font-semibold tracking-wide text-sm">{title}</p>
        </div>
    )
}

export default ButtonPrimary

import { Add } from 'iconsax-react'
import React from 'react'


interface ButtonSecondaryProps {
    title: string,
    disabled?: boolean,
    onClick?: () => void
}

function ButtonSecondary({ title, disabled = false, onClick }: ButtonSecondaryProps) {
    return (
        <div className={`flex flex-row items-center rounded-sm py-2 px-4 ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-slate-200 hover:bg-slate-300'} transition-all cursor-pointer w-fit`} onClick={onClick}>
            <p className="text-slate-500 font-medium tracking-wide text-sm flex items-center"><Add size={22} /> <div className="w-2"></div>{title}</p>
        </div>
    )
}

export default ButtonSecondary

import { Add } from 'iconsax-react'
import React from 'react'


interface ButtonSecondaryProps {
    title: string,
    disabled?: boolean,
    onClick?: () => void
}

function ButtonSecondary({ title, disabled = false, onClick }: ButtonSecondaryProps) {
    return (
        <div className={`flex flex-row items-center rounded-sm py-2 px-4 ${disabled ? 'bg-slate-400 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200'} transition-all cursor-pointer w-fit`} onClick={onClick}>
            <p className="text-slate-500 font-medium text-sm flex items-center"><Add size={20} className="-ml-1 stroke-2 font-bold" /><div className="w-2"></div>{title}</p>
        </div>
    )
}

export default ButtonSecondary

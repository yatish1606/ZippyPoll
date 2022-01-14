import { Add } from 'iconsax-react'
import React, { Fragment } from 'react'


interface ButtonSecondaryProps {
    title?: string,
    disabled?: boolean,
    onClick?: () => void,
    iconBefore?: JSX.Element | Element,
    className?: string
}

function ButtonSecondary({ title, disabled = false, onClick, iconBefore, className = "" }: ButtonSecondaryProps) {
    return (
        <div className={`justify-center text-slate-500 font-medium text-sm flex flex-row items-center rounded-sm py-2 ${title ? 'px-4' : 'px-2'} ${disabled ? 'bg-slate-400 cursor-not-allowed' : 'border-2 border-gray-200 hover:bg-gray-200'} transition-all cursor-pointer w-fit ${className}`} onClick={onClick}>

            <div className={title ? `-ml-1` : ''}>{iconBefore}</div>
            {title && iconBefore ? <div className="w-2"></div> : null}
            <div className="text-slate-500 font-medium text-sm flex items-center">
                {title}
            </div>
        </div>
    )
}

export default ButtonSecondary

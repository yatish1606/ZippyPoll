import React from 'react'


interface ButtonPrimaryProps {
    title?: string,
    disabled?: boolean,
    onClick?: () => void,
    iconBefore?: any,
}

function ButtonPrimary({ title, disabled = false, onClick, iconBefore }: ButtonPrimaryProps) {
    return (
        <div className={`min-h-[2.5rem] text-white flex flex-row items-center justify-center rounded-sm py-2 px-4 ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} transition-all cursor-pointer`} onClick={onClick}>
            {iconBefore ? <div className='-ml-2'>{iconBefore}</div> : null}
            {title && iconBefore ? <div className="w-1"></div> : null}
            <p className="text-white font-medium tracking-wide text-sm">{title}</p>
        </div>
    )
}

export default ButtonPrimary

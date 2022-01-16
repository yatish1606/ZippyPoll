import React from 'react'


interface ButtonDangerProps {
    title?: string,
    disabled?: boolean,
    onClick?: () => void,
    iconBefore?: any,
}

function ButtonDanger({ title, disabled = false, onClick, iconBefore }: ButtonDangerProps) {
    return (
        <div className={`min-h-[2.5rem] w-fit text-white flex flex-row items-center justify-center rounded-sm py-2 px-4 ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} transition-all cursor-pointer`} onClick={onClick}>
            {iconBefore ? <div className='-ml-2'>{iconBefore}</div> : null}
            {title && iconBefore ? <div className="w-1"></div> : null}
            <p className="text-white font-medium tracking-wide text-sm">{title}</p>
        </div>
    )
}

export default ButtonDanger

import React, { Fragment } from 'react'

function LayoutWrapper({ children }: { children: any }) {
    return (
        <div className='w-full h-full flex flex-col p-6 overflow-y-scroll'>
            {children}
        </div>
    )
}

export default LayoutWrapper

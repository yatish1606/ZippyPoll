import React from 'react'
import Spinner from '@atlaskit/spinner'

function Loading() {
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <Spinner />
            <div className="h-4"></div>
            <p className="text-sm text-slate-500">loading</p>
        </div>
    )
}

export default Loading

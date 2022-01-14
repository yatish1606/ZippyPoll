import { stringify } from 'querystring'
import React, { useEffect, useState } from 'react'
import { Poll } from '../models/Poll'
import { isObjectEmpty } from '../utils'
import ButtonPrimary from './ButtonPrimary'

function PollCard({ poll }: { poll: Poll }) {

    const [selectedOption, setSelectedOption] = useState<Object | null>(null)

    return (
        <div className='my-2 p-5 bg-slate-100 transition-all rounded-sm flex flex-col w-full'>
            <p className="text-md text-slate-700 font-medium">{poll.title}</p>
            {poll.description ? <p className="text-xs tracking-wide text-slate-400 font-normal mt-3">{poll.description}</p> : null}
            <form action="POST">
                {
                    poll.multipleAllowed ? null
                        : Object.entries(poll.options).map((entry: [string, string], index: number) => {
                            const [key, value] = entry
                            const activeColor = selectedOption?.hasOwnProperty(key) ? 'text-green-600 border-green-600' : ''
                            const bgColor = selectedOption?.hasOwnProperty(key) ? 'bg-green-600' : ''
                            return (
                                <div key={index} className='flex flex-row items-center mt-4 text-slate-500 hover:text-slate-700 transition-all w-fit cursor-pointer' onClick={() => setSelectedOption(selectedOption?.hasOwnProperty(key) ? {} : { [key]: value })}>
                                    <div className={`h-4 w-4 rounded-full border-2 border-slate-300 ${activeColor} flex items-center justify-center transition-all`}>
                                        <div className={`h-2 w-2 rounded-full ${bgColor} bg-green-600 transition-all`} style={{ display: activeColor.length ? 'flex' : 'none' }}></div>
                                    </div>
                                    <div className="w-4"></div>
                                    <p className={`text-sm font-normal tracking-wide transition-all ${activeColor}`}>{value}</p>
                                </div>
                            )
                        })
                }
                <div className="h-5"></div>
                <div className="flex flex-row items-center">
                    <ButtonPrimary title="Submit" disabled={isObjectEmpty(selectedOption)} />
                    <div className="w-4"></div>
                    <div className="flex flex-row items-center">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden">
                            {
                                poll.createdBy.profilePicture ?
                                    <img className='w-full h-full object-center' src={poll.createdBy.profilePicture} />
                                    :
                                    <div className="w-full h-full flex items-center justify-center bg-gray-400">
                                        <p className="text-white text-xs tracking-wider">{poll.createdBy.firstName.charAt(0).toUpperCase() + poll.createdBy.lastName.charAt(0).toUpperCase()}</p>
                                    </div>
                            }
                        </div>
                        <div className="w-2"></div>
                        <p className="text-xs text-slate-400 font-normal tracking-wide">asked by <span className='text-green-600 cursor-pointer font-medium'>{poll.createdBy.firstName} {poll.createdBy.lastName}</span></p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PollCard

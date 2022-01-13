import React, { Fragment, useEffect, useState } from 'react'
import fetchPolls from '../actions/fetchPolls'
import { Poll } from '../models/Poll'
import PollCard from '../components/PollCard'
import { useAuth } from '../context/UserContext'
import { Navigate } from 'react-router-dom'
import { useModal } from '../context/ModalContext'

function Home() {

    const [currentPolls, setCurrentPolls] = useState<Array<Poll>>([])
    const { userAuthState } = useAuth()
    const { modalName } = useModal()

    useEffect(() => {
        fetchPolls({ sortBy: 'NEW_TO_OLD', pageId: 1, byUser: '', searchQuery: '' }).then((res) => {
            if (res) {
                setCurrentPolls([...currentPolls, ...res])
            }
        })
    }, [])

    return (
        <Fragment>
            <div className='w-full h-full flex flex-col p-6 overflow-y-scroll'>
                <div className="flex items-center justify-between">
                    <h2 className='font-bold tracking-wid text-slate-700 text-4xl'>Home</h2>
                    {/* <ButtonPrimary title='Create new poll' onClick={() => setModal('ADD')} /> */}
                </div>
                {modalName}
                <br />
                <div className="flex justify-between">
                    <div className='w-1/2 flex flex-col'>
                        <h3 className='font-semibold tracking-wid text-slate-600 text-xl'>Popular polls right now</h3>
                        <div className="h-2"></div>
                        {
                            currentPolls.map((poll: Poll, index: number) => {
                                return <PollCard key={index} poll={poll} />
                            })
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Home

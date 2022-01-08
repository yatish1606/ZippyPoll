import React, { Fragment, useEffect, useState } from 'react'

import Textfield from '@atlaskit/textfield'
import fetchPolls from '../actions/fetchPolls'
import { Poll } from '../models/Poll'
import PollCard from '../components/PollCard'
import ButtonPrimary from '../components/ButtonPrimary'
import AddEditModal from '../components/AddEditModal'



function Home({ modalToggler }: { modalToggler: (v: string) => void }) {


    const [currentPolls, setCurrentPolls] = useState<Array<Poll>>([])
    const [showAddEditModal, setShowAddEditModal] = useState<boolean>(false)

    useEffect(() => {
        fetchPolls({ sortBy: 'NEW_TO_OLD', pageId: 1, byUser: '', searchQuery: '' }).then((res) => {
            if (res) {
                console.log('hi')
                setCurrentPolls([...currentPolls, ...res])
            }
        })
    }, [])

    return (
        <Fragment>
            <div className='w-full h-full flex flex-col p-6'>
                <div className="flex items-center justify-between">
                    <h2 className='font-bold tracking-wid text-slate-700 text-4xl'>Home</h2>
                    <ButtonPrimary title='Create new poll' onClick={() => setShowAddEditModal(true)} />
                </div>

                <br />
                <div className="flex justify-between">
                    <div className='w-1/2 flex flex-col'>
                        <h3 className='font-semibold tracking-wid text-slate-600 text-xl'>Popular polls right now</h3>
                        <div className="h-2"></div>
                        {
                            currentPolls.map((poll: Poll, index: number) => {
                                return <PollCard poll={poll} />
                            })
                        }
                    </div>
                </div>
            </div>
            <AddEditModal canShow={showAddEditModal} updateModalState={() => setShowAddEditModal(!showAddEditModal)} title='Create a new poll' isAdd />
        </Fragment>
    )
}

export default Home

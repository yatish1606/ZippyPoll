import React, { useEffect, useState } from 'react'
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu'
import Textfield from '@atlaskit/textfield'
import fetchPolls from '../actions/fetchPolls'

const sortByOptions: Array<{ name: string, code: string }> = [
    {
        name: 'Newest first',
        code: 'NEW_TO_OLD'
    },
    {
        name: 'Oldest first',
        code: 'OLD_TO_NEW'
    }, {
        name: 'Alphabetical',
        code: 'ALPHABETICAL'
    }
]

function Home() {


    const [sortBy, setSortBy] = useState<string>(sortByOptions[0].name)

    useEffect(() => {
        fetchPolls({ sortBy: 'NEW_TO_OLD', pageId: 1, byUser: '', searchQuery: '' }).then(() => {
            console.log('hi')
        })
    }, [])

    return (
        <div className='w-full h-full flex flex-col p-6'>
            <h2 className='font-bold tracking-wid text-slate-700 text-4xl'>Home</h2>
            <br />
            <div className="flex flex-row items-start text-sm tracking-wid">
                <Textfield placeholder='Search for polls .. ' className='px-2' width={400} />
                <div className="w-4"></div>
                <DropdownMenu trigger={`Sort by : ${sortBy}`}>
                    <DropdownItemGroup>
                        {sortByOptions.map((sortBy: { name: string, code: string }, index: number) => {
                            return <div onClick={() => setSortBy(sortBy.name)}>
                                <DropdownItem>{sortBy.name}</DropdownItem>
                            </div>
                        })}
                    </DropdownItemGroup>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default Home

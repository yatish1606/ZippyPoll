import { GlobalSearch, SearchNormal1 } from 'iconsax-react'
import React, { useState } from 'react'
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu'

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

function SearchBar() {

    const [isActive, setIsActive] = useState(false)
    const [sortBy, setSortBy] = useState<string>(sortByOptions[0].name)

    return (
        <div className='w-full h-14 border-gray-200 border-b px-3 flex flex-row justify-between items-center'>
            <div className={`flex items-center bg-white p-2 py-1 my-3 rounded-md transition-all mr-4`}>
                <GlobalSearch size={20} className='text-gray-400' />
                <div className="w-4"></div>
                <input onClick={() => setIsActive(!isActive)} type="text" className=' placeholder:text-sm text-sm tracking-wide w-full border-none outline-none placeholder:font-normal placeholder:text-gray-400 bg-none bg-transparent' placeholder='Search polls ... ' />
            </div>
            <div className="w-4"></div>
            <div className='flex flex-row items-center text-sm tracking-wide'>
                <DropdownMenu trigger={`Sort by : ${sortBy}`}>
                    <DropdownItemGroup>
                        {sortByOptions.map((sortBy: { name: string, code: string }, index: number) => {
                            return <div className='text-xs tracking-wider' onClick={() => setSortBy(sortBy.name)}>
                                <DropdownItem>{sortBy.name}</DropdownItem>
                            </div>
                        })}
                    </DropdownItemGroup>
                </DropdownMenu>
            </div>

        </div>
    )
}

export default SearchBar

import { Add, GlobalSearch, MessageNotif, Moon, SearchNormal1, Settings, Sun, Sun1 } from 'iconsax-react'
import React, { useState } from 'react'
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu'
import ButtonPrimary from './ButtonPrimary'
import { useModal } from '../context/ModalContext'
import ButtonSecondary from './ButtonSecondary'

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
    const { modalName, setModal } = useModal()

    return (
        <div className='dark:bg-neutral-900 bg-white w-full h-14 dark:border-b-gray-700 border-gray-200 border-b px-3 flex flex-row justify-between items-center'>
            <div className={`flex items-center p-2 py-1 my-3 rounded-md transition-all mr-4`}>
                <GlobalSearch size={20} className='text-gray-400 dark:text-gray-600' />
                <div className="w-4"></div>
                <input onClick={() => setIsActive(!isActive)} type="text" className='placeholder:text-sm text-sm tracking-wide w-full border-none outline-none placeholder:font-normal placeholder:text-gray-400 bg-none bg-transparent dark:placeholder:text-gray-600 dark:text-gray-200' placeholder='Search polls ... ' />
            </div>
            <div className="w-4"></div>
            <div className="flex justify-center">
                <div className='flex flex-row items-center text-sm tracking-wide'>
                    <DropdownMenu trigger={`Sort by : ${sortBy}`}>
                        <DropdownItemGroup>
                            {sortByOptions.map((sortBy: { name: string, code: string }, index: number) => {
                                return <div key={index} className='text-xs tracking-wider' onClick={() => setSortBy(sortBy.name)}>
                                    <DropdownItem>{sortBy.name}</DropdownItem>
                                </div>
                            })}
                        </DropdownItemGroup>
                    </DropdownMenu>
                </div>
                <div className="w-3"></div>
                {/* <div className='transition-all flex cursor-pointer rounded-sm hover:bg-gray-100 dark:hover:bg-neutral-700 items-center justify-center text-gray-400 dark:text-gray-600 hover:text-gray-200 dark:hover:text-gray-400 px-2'>
                    <DropdownMenu trigger={`Sort by : ${sortBy}`}>
                        <DropdownItemGroup>
                            <DropdownItem><Sun1 size={19}></Sun1></DropdownItem>
                            <DropdownItem><Moon size={16}></Moon></DropdownItem>
                            <DropdownItem><Settings size={18}></Settings></DropdownItem>
                        </DropdownItemGroup>
                    </DropdownMenu>
                </div>
                <div className="w-3"></div> */}
                <ButtonPrimary iconBefore={<Add size={18} />} title='Create' onClick={() => setModal('ADD')} />
            </div>

        </div>
    )
}

export default SearchBar

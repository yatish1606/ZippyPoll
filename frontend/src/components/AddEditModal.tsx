import { Add, ArrowDown2, Global, SecuritySafe } from 'iconsax-react'
import React, { Fragment, Ref, useEffect, useState } from 'react'
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu'
import ButtonSecondary from './ButtonSecondary'
import ButtonPrimary from './ButtonPrimary'
import { useAuth } from '../context/UserContext'

interface AddEditModalProps {
    title: string,
    isAdd: boolean,
    canShow: boolean,
    updateModalState: () => void
}

interface Option {
    key: string,
    value: string
}

interface VisibilityItem {
    icon: any,
    title: string,
    description: string
}

interface Deadline {
    title: string,
    ms: number
}

const visibilityItems: Array<VisibilityItem> = [
    {
        icon: <Global size={22} />,
        title: 'Public',
        description: 'visible to everyone, and anyone can vote on your poll'
    },
    {
        icon: <SecuritySafe size={22} />,
        title: 'Private',
        description: 'only visible to those who have the link of the poll'
    }
]

const deadlines: Array<Deadline> = [
    {
        title: '1 hour',
        ms: 3600000
    },
    {
        title: '3 hours',
        ms: 10800000
    },
    {
        title: '6 hours',
        ms: 21600000
    },
    {
        title: '12 hours',
        ms: 43200000
    },
    {
        title: '1 day',
        ms: 86400000
    },
    {
        title: '3 days',
        ms: 259200000
    },
    {
        title: '7 days',
        ms: 604800000
    }
]

function AddEditModal({
    title,
    isAdd = true,
    canShow,
    updateModalState
}: AddEditModalProps) {


    const [options, setOptions] = useState<Map<string, string>>(new Map<string, string>())
    const [activeOptionCount, setActiveOptionCount] = useState<number>(2)
    const [isPublic, setIsPublic] = useState<boolean>(false)
    const [isMultipleAllowed, setIsMultipleAllowed] = useState<boolean>(false)
    const [pollTitle, setPollTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [deadline, setDeadline] = useState<Deadline>(deadlines[0])
    const [resultsHidden, setResultsHidden] = useState<boolean>(false)
    const { userAuthState } = useAuth()

    useEffect(() => {
        canShow = false
        setTimeout(() => {
            canShow = true
        }, 500)
        setOptions(new Map(options.entries()).set('0', '').set('1', ''))
    }, [])

    const addNewOption = (): void => {
        setOptions(
            new Map(options.entries()).set(activeOptionCount + '', '')
        )
        setActiveOptionCount(activeOptionCount + 1)
    }

    const removeOption = (opt: string): void => {
        let newMap = new Map(options.entries())
        setOptions(newMap)
    }

    const VisibilityItem = ({ icon, title, description }: VisibilityItem): JSX.Element => {
        return (
            <div className="flex items-center text-slate-400 py-1 hover:bg-slate-100 transition-all cursor-pointer">
                {icon}
                <div className="w-3"></div>
                <div className="flex flex-col">
                    <p className="font-semibold text-slate-600 leading-8 text-sm">{title}</p>
                    <p className="font-normal text-slate-400 text-xs">{description}</p>
                </div>
            </div>
        )
    }

    const submitForm = (): void => {
        let data = {
            title: pollTitle.trim(),
            description: (description.length && description.trim().length > 100 ? description.trim().slice(0, 100).concat(' ... ') : description) || null,
            createdWhen: new Date().getTime(),
            type: isMultipleAllowed ? 'DROPDOWN' : 'RADIO',
            isPublic,
            isMultipleAllowed,
            deadline: new Date().getTime() + deadline.ms,
            options: new Map(
                Array
                    .from(options.entries())
                    .filter((entry: [string, string]) => entry[1].length)
                    .sort(([key1, _], [key2, __]) => parseInt(key1) - parseInt(key2))
                    .map((entry: [string, string], index: number) => [index + '', entry[1]])),
            createdBy: userAuthState
        }
        console.log(data)
    }


    return canShow ? (
        <div className='w-screen h-screen absolute bg-black/70 z-100 flex flex-row justify-end transition-all  backdrop-blur-sm delay-200' style={{ display: canShow ? 'flex' : 'none' }}>
            <div className='bg-white w-1/2 h-full flex flex-col ml-1/2 p-8 transition-all duration-300 delay-1000 ease-out overflow-y-scroll'>
                <form action="POST" className='w-full flex flex-col transition-all'>
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row items-center">
                            <div className="cursor-pointer w-8 h-8 rounded-sm hover:bg-slate-100 transition-all flex items-center justify-center" onClick={() => {
                                canShow = false
                                updateModalState()
                            }} >
                                <Add size={26} className='text-slate-500 cursor-pointer rotate-45' />
                            </div>
                            <div className="w-4"></div>
                            <p className="text-xl text-slate-700 font-semibold tracking-normal">Create a new poll</p>
                        </div>
                        <div className="flex text-sm">
                            <DropdownMenu
                                trigger={({ triggerRef, isSelected, ...props }) => {
                                    return <div
                                        ref={triggerRef as Ref<HTMLDivElement>}
                                        className={`cursor-pointer bg-slate-100 hover:bg-slate-200 rounded-sm py-2 text-sm text-slate-600 flex items-center px-3 font-medium`}
                                        {...props}
                                    >
                                        {isPublic ? <Global size={18} /> : <SecuritySafe size={18} />}
                                        <div className="w-2"></div>
                                        {isPublic ? 'public' : 'private'}
                                        <div className="w-2"></div>
                                        <ArrowDown2 size={12} className='stroke-2 text-slate-600' />
                                    </div>
                                }}
                                placement="bottom-end"
                            >
                                <DropdownItemGroup>
                                    {
                                        visibilityItems.map((item: VisibilityItem, index: number) => <DropdownItem onClick={() => setIsPublic(item.title === 'Public')}>
                                            <VisibilityItem key={index} icon={item.icon} title={item.title} description={item.description} />
                                        </DropdownItem>
                                        )
                                    }
                                </DropdownItemGroup>
                            </DropdownMenu>
                            <div className="w-2"></div>
                            <ButtonPrimary title='Create' onClick={submitForm} />
                        </div>
                    </div>
                    <br />

                    <input required autoFocus type="text" className='w-full border-b-2 focus:border-green-600 placeholder:text-slate-300 text-slate-700 text-lg font-medium mb-4 outline-none border-b-slate-300 py-2 tracking-normal transition-all invalid:text-red-600 invalid:border-b-red-600' placeholder='Enter a title or question here' onChange={e => setPollTitle(e.target.value)} />
                    <div className="h-3"></div>
                    <input type="text" className='w-full border-b-2 focus:border-green-600 placeholder:text-slate-300 text-slate-700 text-sm font-normal mb-4 outline-none border-b-slate-300 py-2 transition-all' placeholder='Enter a description for your poll here' onChange={e => setDescription(e.target.value)} />
                    <div className="h-3"></div>
                    <div className="flex flex-row justify-between items-center text-sm mb-2 font-bold">
                        <p className="font-semibold text-sm leading-9 text-slate-600 flex items-baseline">Add a few options  <div className="w-2"></div><span className='font-normal text-xs tracking-wid text-slate-400'>- people will be able to select {isMultipleAllowed ? 'multiple options' : 'any one option'}</span></p>
                        <DropdownMenu trigger={`${isMultipleAllowed ? 'multiple options' : 'single option only'}`}>
                            <DropdownItemGroup>
                                <DropdownItem onClick={() => setIsMultipleAllowed(false)}>single option only</DropdownItem>
                                <DropdownItem onClick={() => setIsMultipleAllowed(true)}>multiple options</DropdownItem>
                            </DropdownItemGroup>
                        </DropdownMenu>
                    </div>
                    <div className="flex flex-col border-2 border-slate-200 rounded-sm">
                        {
                            Array.from(options.entries()).map((entry: [string, string], index: number) => {
                                return (
                                    <div className='w-full flex border-b-2 border-b-slate-200 flex-row items-center px-4 py-3 text-slate-500 hover:text-slate-700 transition-all'>
                                        <div className={`h-4 w-4 border-2 border-slate-300 mr-4 flex items-center justify-center transition-all ${isMultipleAllowed ? 'rounded-sm' : 'rounded-full'}`}>
                                        </div>
                                        <input
                                            type="text"
                                            className='w-full border-b-0 h-8 focus:border-green-600 placeholder:text-slate-300 text-slate-700 text-sm font-normal outline-none border-b-slate-300 tracking-tight transition-all'
                                            placeholder={`add option ${index}`}
                                            value={entry[1]}
                                            onChange={(e) => setOptions(new Map(options.entries()).set(entry[0] + '', e.target.value))}
                                        />
                                        <div className="w-4"></div>
                                        <div className="w-8 h-8 rounded-sm hover:bg-slate-100 transition-all flex items-center justify-center">
                                            <Add size={26} className='text-slate-400 cursor-pointer rotate-45 hover:text-slate-500 transition-all' onClick={() => removeOption(entry[0])} />
                                        </div>

                                    </div>
                                )
                            })
                        }
                        <div className='w-full flex flex-row items-center px-4 py-3 text-slate-500 hover:text-slate-700 transition-all'>
                            <div className={`h-4 w-4 border-2 border-slate-300 mr-4 flex items-center justify-center transition-all ${isMultipleAllowed ? 'rounded-sm' : 'rounded-full'}`}>
                            </div>
                            <ButtonSecondary title='add new option' onClick={addNewOption} />
                        </div>
                    </div>
                    <div className="h-3"></div>
                    <div className="flex items-center border-slate-200 border-2 rounded-sm p-4 cursor-pointer" onClick={() => setResultsHidden(!resultsHidden)}>
                        <div className={`w-4 h-4 cursor-pointer flex items-center justify-center rounded-sm ${resultsHidden ? 'bg-green-600' : 'border-2 border-gray-300'}`}>

                        </div>
                        <div className="w-4"></div>
                        <div className="flex-col flex w-fit">
                            <p className="font-semibold text-sm text-slate-600 flex items-baseline">Let people see results</p>
                            <p className='font-normal text-xs tracking-wid text-slate-400'>Let people view results immediately after they answer the poll</p>
                        </div>
                    </div>
                    <div className="h-4"></div>
                    <div className="flex-col flex border-slate-200 border-2 rounded-sm p-4">
                        <div className="flex flex-row items-center text-sm mb-2 font-bold">
                            <p className="font-semibold text-sm text-slate-600 flex items-baseline">Keep this poll active for </p>
                            <div className="w-2"></div>
                            <DropdownMenu trigger={`${deadline.title}`}>
                                <DropdownItemGroup>
                                    {
                                        deadlines.map((deadline: Deadline, index: number) => <DropdownItem key={index} onClick={() => setDeadline(deadline)}>{deadline.title}</DropdownItem>)
                                    }
                                </DropdownItemGroup>
                            </DropdownMenu>
                        </div>
                        <p className='font-normal text-xs tracking-wid text-slate-400'>You will be able to close the poll or extend it anytime</p>
                    </div>
                </form>
            </div>
        </div >
    ) : <Fragment></Fragment>
}

export default AddEditModal

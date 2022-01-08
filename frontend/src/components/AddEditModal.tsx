import { Add } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import Textfield from '@atlaskit/textfield'
import Textarea from '@atlaskit/textarea'
import ButtonPrimary from './ButtonPrimary'
import ButtonSecondary from './ButtonSecondary'

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

function AddEditModal({
    title,
    isAdd = true,
    canShow,
    updateModalState
}: AddEditModalProps) {


    const [options, setOptions] = useState<Map<string, string>>(new Map<string, string>())

    useEffect(() => {
        options.set('0', '')
        options.set('1', '')
    })

    const addNewOption = (): void => {
        setOptions(
            new Map(options).set(Math.max(...Array.from(options.keys()).map(v => parseInt(v))) + 1 + '', '')
        )
    }

    const removeOption = (opt: string): void => {
        let newMap = new Map(options)
        newMap.delete(opt)
        setOptions(newMap)
    }

    console.log(options)
    return (
        <div className='w-screen h-screen absolute bg-black/70 z-100 flex flex-row justify-end transition-all -translate-x-64' style={{ display: canShow ? 'flex' : 'none' }}>
            <div className='bg-white w-1/2 h-full flex flex-col ml-1/2 p-6'>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center">
                        <Add size={26} className='text-slate-500 cursor-pointer rotate-45' onClick={() => {
                            canShow = false
                            updateModalState()
                        }} />
                        <div className="w-4"></div>
                        <p className="text-xl text-slate-700 font-semibold">Create a new poll {canShow ? 'can ' : 'cannot'}</p>
                    </div>
                </div>
                <br />
                <form action="POST" className='w-full flex flex-col transition-all'>
                    <input type="text" className='w-full border-b-2 focus:border-green-600 placeholder:text-slate-300 text-slate-700 text-lg font-medium mb-4 outline-none border-b-slate-300 py-2 tracking-tight transition-all' placeholder='Enter a title or question here' />
                    {/* <Textfield placeholder='Enter a title or question here' className='px-2' size={40} /> */}
                    <div className="h-3"></div>
                    <input type="text" className='w-full border-b-2 focus:border-green-600 placeholder:text-slate-300 text-slate-700 text-sm font-normal mb-4 outline-none border-b-slate-300 py-2 transition-all' placeholder='Enter a description for your poll here' />
                    {
                        Array.from(options.entries()).map((entry: [string, string], index: number) => {
                            return (
                                <div className='w-full flex flex-row items-center mt-3 py-2 text-slate-500 hover:text-slate-700 transition-all'>
                                    <div className={`h-4 w-4 rounded-full border-2 border-slate-300 flex items-center justify-center transition-all`}>
                                    </div>
                                    <div className="w-4"></div>
                                    <input
                                        type="text"
                                        className='w-full border-b-2 h-8 focus:border-green-600 placeholder:text-slate-300 text-slate-700 text-sm font-normal outline-none border-b-slate-300 tracking-tight transition-all'
                                        placeholder={`Option ${index}`}
                                        onChange={(e) => setOptions(new Map(options.set(entry[0], e.target.value)))}
                                    />
                                    <div className="w-4"></div>
                                    <Add size={26} className='text-slate-400 cursor-pointer rotate-45 hover:text-slate-500 transition-all' onClick={() => removeOption(entry[0])} />
                                </div>
                            )
                        })
                    }
                    <ButtonSecondary title='Add new option' onClick={addNewOption} />
                    {/* <ButtonPrimary title="Create" /> */}
                </form>
            </div>
        </div>
    )
}

export default AddEditModal

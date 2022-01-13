import { Edit, Edit2, UserEdit } from 'iconsax-react'
import React from 'react'
import ButtonDanger from '../components/ButtonDanger'
import ButtonSecondary from '../components/ButtonSecondary'
import Divider from '../components/Divider'

function Account() {
    return (
        <div className='w-full h-full flex flex-col p-6 overflow-y-scroll'>
            <div className="flex items-center justify-between">
                <h2 className='font-bold tracking-wid text-slate-700 text-3xl'>Account and Settings</h2>
                <ButtonSecondary iconBefore={<UserEdit size={16} />} title='Edit Account' />
            </div>
            <div className="flex flex-col w-full">
                <Divider />
                <div className="w-fit flex flex-col p-4 bg-red-50 rounded-sm">
                    <p className='font-bold tracking-wid text-slate-700 text-l'>Delete Account</p>
                    <div className="h-2"></div>
                    <p className="font-normal text-slate-500 text-sm">This action is irreversible. Once you delete your account, you cannot get it back</p>
                    <div className="h-4"></div>
                    <ButtonDanger title='Delete Account' />
                </div>
            </div>
            <br />

        </div>
    )
}

export default Account
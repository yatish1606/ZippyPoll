import Tooltip from '@atlaskit/tooltip'
import { AlignLeft, AlignVertically, Global, Information, Profile, Setting } from 'iconsax-react'
import React, { Fragment, useState } from 'react'

interface sidebarOption {
    name: string,
    icon: any,
    description: string,
    link: string
}

const sidebarOptions: Array<sidebarOption> = [
    {
        name: 'Home',
        icon: <Global size={20} />,
        description: 'View public polls, and other content',
        link: '/home'
    },
    {
        name: 'My Polls',
        icon: <AlignLeft size={20} />,
        description: 'Manage your polls',
        link: '/me'
    },
    {
        name: 'Poll Settings',
        icon: <Setting size={20} />,
        description: 'Manage your polls',
        link: '/me'
    },
    {
        name: 'About PollZapp',
        icon: <Information size={20} />,
        description: 'Manage your polls',
        link: '/me'
    },
]

function Sidebar() {



    return (
        <div className={`w-full h-full flex flex-col items-center transition-all w-64 bg-slate-800`}>
            <div className="w-full h-16 flex items-center justify-center "></div>
            <br />
            <div className="w-full flex-1 flex flex-col items-center px-3 justify-between pb-4">
                <div className='w-full flex-1 flex flex-col items-center'>
                    {
                        sidebarOptions.map((option: sidebarOption, index: number) => {
                            return (
                                <div className="transition-all w-full cursor-pointer hover:bg-slate-600 rounded-md mx-3">
                                    <Tooltip content={option.description} position='right' key={index}>
                                        <div className="transition-all w-full flex flex-row items-center justify-start py-4 px-4 text-slate-400 hover:text-white">
                                            {option.icon}
                                            <Fragment>
                                                <div className="w-4"></div>
                                                <p className="text-base font-normal tracking-wid">{option.name}</p>
                                            </Fragment>

                                        </div>
                                    </Tooltip>
                                </div>

                            )
                        })
                    }
                </div>
                <div className="transition-all w-full cursor-pointer hover:bg-gray-200 rounded-md mx-3">
                    <Tooltip content="Your account settings and details" position='right'>
                        <div className="transition-all w-full flex flex-row items-center justify-start py-4 px-4 text-slate-400 hover:text-white">
                            <Profile size={20} />
                            <Fragment>
                                <div className="w-4"></div>
                                <p className="text-base font-normal tracking-wid">Account</p>
                            </Fragment>

                        </div>
                    </Tooltip>
                </div>
            </div>
        </div >
    )
}

export default Sidebar

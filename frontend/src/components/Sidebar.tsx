import Tooltip from '@atlaskit/tooltip'
import { AlignLeft, AlignVertically, Bubble, Global, Graph, Information, Profile, Setting, UserSquare } from 'iconsax-react'
import React, { Fragment, useState } from 'react'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'

interface sidebarOption {
    name: string,
    icon: any,
    description: string,
    link: string,
    isActive?: boolean
}

const sidebarOptions: Array<sidebarOption> = [
    {
        name: 'Home',
        icon: <Global size={20} />,
        description: 'View public polls, and other content',
        link: '/app/home',
        isActive: window.location.href.includes('/app/home')
    },
    {
        name: 'My Polls',
        icon: <AlignLeft size={20} />,
        description: 'Manage your polls',
        link: '/app/me',
        isActive: window.location.href.includes('/app/me')
    },
    {
        name: 'Settings',
        icon: <Setting size={20} />,
        description: 'Manage your poll settings',
        link: '/app/settings',
        isActive: window.location.href.includes('/app/settings')
    },
    {
        name: 'Help',
        icon: <Bubble size={20} />,
        description: 'Find out more about PollZap',
        link: '/app/help',
        isActive: window.location.href.includes('/pp/about')
    },
]

function Sidebar() {

    const [_, setActiveLink] = useState<string>('/app/home')

    const Logo = (): JSX.Element => {
        return <div className='w-10 h-10 rounded-md flex items-center justify-center bg-green-600'>
            <Graph size={18} className='text-white rotate-45' />
        </div>
    }

    return (
        <div className={`w-full h-full flex flex-col items-center transition-all w-20 bg-white border-r-2 border-r-gray-200`}>
            <div className="w-full h-16 flex items-center justify-center ">
                <Logo />
            </div>
            <br />
            <div className="w-full flex-1 flex flex-col items-center px-2 justify-between pb-4">
                <div className='w-full flex-1 flex flex-col items-center'>
                    {
                        sidebarOptions.map((option: sidebarOption, index: number) => {
                            const isActive = window.location.href.includes(option.link)
                            return (
                                <div key={index} className={`transition-all w-full cursor-pointer hover:bg-slate-100 rounded-md mx-1 my-1 ${isActive ? 'bg-green-100 text-green-600 hover:bg-green-100' : ''}`} onClick={() => setActiveLink(option.link)}>
                                    <Link to={option.link}>
                                        <Tooltip content={option.description} position='right' key={index}>
                                            <div className={`transition-all w-full flex flex-col items-center py-2 my-1 px-1 text-slate-500 hover:text-slate-600 ${isActive ? 'text-green-600 hover:text-green-700' : ''}`}>
                                                {option.icon}
                                                <div className="h-2"></div>
                                                <Fragment>
                                                    <div className="w-4"></div>
                                                    <p className={`text-xs tracking-wide text-center transition-all ${isActive ? 'font-medium' : 'font-medium'}`}>{option.name}</p>
                                                </Fragment>
                                            </div>
                                        </Tooltip>
                                    </Link>
                                </div>

                            )
                        })
                    }
                </div>
                <div className={`transition-all w-full cursor-pointer hover:bg-slate-100 rounded-md mx-1 my-1 ${window.location.href.includes('/account') ? 'bg-green-100 text-green-600 hover:bg-green-100' : ''}`} onClick={() => setActiveLink("/account")}>
                    <Link to="/app/account">
                        <Tooltip content="Account info and settings" position='right'>
                            <div className={`transition-all w-full flex flex-col items-center py-2 my-1 px-1 text-slate-500 hover:text-slate-600 ${window.location.href.includes('/account') ? 'text-green-600 hover:text-green-700' : ''}`}>
                                <UserSquare size={22} />
                                <div className="h-2"></div>
                                <Fragment>
                                    <div className="w-4"></div>
                                    <p className={`text-xs tracking-wide text-center transition-all ${window.location.href.includes('/account') ? 'font-medium' : 'font-medium'}`}>Account</p>
                                </Fragment>
                            </div>
                        </Tooltip>
                    </Link>
                </div>
            </div>
        </div >
    )
}

export default Sidebar

import Tooltip from '@atlaskit/tooltip'
import { AlignVertically, Global } from 'iconsax-react'
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
        icon: <Global size={20} color='grey' />,
        description: 'View public polls, and other content',
        link: '/home'
    },
    {
        name: 'My Polls',
        icon: <AlignVertically size={20} color='grey' />,
        description: 'Manage your polls',
        link: '/me'
    },
]

function Sidebar() {

    const [expanded, setExpanded] = useState(false)
    const containerWidth = expanded ? 'w-64' : 'w-20'


    return (
        <div className={`w-full h-full flex flex-col items-center transition-all ${containerWidth}`} onMouseEnter={() => setExpanded(true)} onMouseLeave={() => setExpanded(false)}>
            <div className="w-full h-16 bg-blue-100 flex items-center justify-center">o</div>
            <br />
            <div className="w-full flex-1 flex flex-col items-center px-4">
                {
                    sidebarOptions.map((option: sidebarOption, index: number) => {
                        return (
                            <div className="w-full cursor-pointer hover:bg-gray-200 rounded-md mx-4">
                                <Tooltip content={option.description} position='right' key={index}>
                                    <div className="w-full flex flex-row items-center justify-start py-4 px-4 text-slate-400 hover:text-slate-700">
                                        {option.icon}
                                        {
                                            expanded ?
                                                <Fragment>
                                                    <div className="w-4"></div>
                                                    <p className="text-sm font-normal">{option.name}</p>
                                                </Fragment>
                                                :
                                                null
                                        }
                                    </div>
                                </Tooltip>
                            </div>

                        )
                    })
                }
            </div>
        </div >
    )
}

export default Sidebar

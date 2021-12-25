import Tooltip from '@atlaskit/tooltip'
import { AlignBottom, Icon, Settings } from 'iconsax-react'
import React from 'react'

interface SidebarOption {
    title: string,
    icon: any
}

function Sidebar() {
    return (
        <div style={styles.container}>

            {
                sidebarOptions.map((option: SidebarOption, index: number) => {
                    return <div style={styles.sideBarOption}>
                        <Tooltip content={option.title}>
                            {option.icon}
                        </Tooltip>
                    </div>
                })
            }
        </div>
    )
}

export default Sidebar

const sidebarOptions: Array<SidebarOption> = [
    {
        title: 'Dashboard',
        icon: <AlignBottom color='green' />
    },
    {
        title: 'Settings',
        icon: <Settings color='green' />
    },
]

const styles = {
    container: {
        display: 'flex',
        backgroundColor: '#fff',
        width: '5rem',
        minHeight: '100vh',
        alignItems: 'center',
        // flexDirection: 'column',
    },
    sideBarOption: {

    }
}



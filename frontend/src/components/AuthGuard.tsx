import React, { Fragment } from 'react'
import { useModal } from '../context/ModalContext'
import { useAuth } from '../context/UserContext'
import AddEditModal from './AddEditModal'
import Sidebar from './Sidebar'
import { Link, useLocation } from 'react-router-dom'
import ButtonPrimary from './ButtonPrimary'

function AuthGuard({ children }: { children: JSX.Element }) {

    const { userAuthState, setUserAuth } = useAuth()
    const { modalName, setModal } = useModal()
    const location = useLocation()

    const renderModalToggler = (): JSX.Element => {
        console.log(modalName)
        switch (modalName) {
            case 'ADD':
                return <AddEditModal title='Create new poll' canShow={true} updateModalState={() => setModal('')} isAdd={true} />
            default:
                return <Fragment></Fragment>
        }
    }

    return userAuthState.isLoggedIn ?
        <Fragment>
            <div className='w-screen h-screen flex flex-row'>
                <Sidebar />
                {children}
                {renderModalToggler()}
            </div>
        </Fragment>
        : location.pathname === '/login'
            ? null
            : <div className="w-full h-screen flex flex-col items-center justify-center py-24">
                <div className="flex-col flex items-center">
                    <p className="text-center text-3xl text-slate-700 font-bold">You aren't authenticated</p>
                    <div className="h-6"></div>
                    <p className="text-center text-sm text-slate-500 font-normal tracking-wide">The page you are trying to access requires you to login with an existing account or <Link className='text-green-600 font-semibold' to={"/login"}>create an account</Link> </p>
                </div>
                <div className="h-16"></div>
                <Link to="/login">
                    <ButtonPrimary title='Sign-in to proceed' />
                </Link>
            </div>
}

export default AuthGuard

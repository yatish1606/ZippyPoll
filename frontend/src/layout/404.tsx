import React from 'react'
import { Link } from 'react-router-dom'
import ButtonPrimary from '../components/ButtonPrimary'

function NotFound() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center py-24">
            <div className="flex-col flex items-center">
                <p className="text-center text-3xl text-slate-700 font-bold">Lost ?</p>
                <div className="h-6"></div>
                <p className="text-center text-sm text-slate-500 font-normal tracking-wide">The page you are trying to access doesn't exist</p>
            </div>
            <div className="h-16"></div>
            <Link to="/app/home">
                <ButtonPrimary title='Go to Home' />
            </Link>
        </div>
    )
}

export default NotFound

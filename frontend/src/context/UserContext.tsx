import React, { useEffect, useState, useContext, createContext } from 'react'
import { User } from '../models/User'

const AuthStateContext = createContext<{ userAuthState: { isLoggedIn: boolean, user: User | null }, setUserAuth: any }>({ userAuthState: { isLoggedIn: false, user: null }, setUserAuth: () => { } })

export const AuthProvider = ({ children }: { children: any }) => {

    const [userAuthState, setUserAuthState] = useState<{ isLoggedIn: boolean, user: User | null }>({
        isLoggedIn: false,
        user: null
    })

    useEffect(() => {
        setUserAuth({
            isLoggedIn: false,
            user: null
        })
    }, [])

    const setUserAuth = (authObject: any) => setUserAuthState(authObject)

    return (
        <AuthStateContext.Provider value={{ userAuthState, setUserAuth }}>
            {children}
        </AuthStateContext.Provider>
    )
}

export const useAuth = () => useContext(AuthStateContext)
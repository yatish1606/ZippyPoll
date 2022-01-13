import React, { Fragment, useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AuthGuard from './components/AuthGuard'
import LayoutWrapper from './components/LayoutWrapper'
import SearchBar from './components/SearchBar'
import { ModalProvider } from './context/ModalContext'
import { AuthProvider, useAuth } from './context/UserContext'
import { Home, Login, Account, NotFound } from './layout'

function App(): JSX.Element {

  const { userAuthState } = useAuth()
  console.log(userAuthState)

  return (
    <BrowserRouter>
      <AuthProvider>
        <ModalProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
          <AuthGuard>
            <div className="flex-1 flex-col flex">
              <SearchBar />
              <Routes>
                {/* <LayoutWrapper> */}
                <Route path="/app/home" element={<Home />} />
                <Route path="/app/account" element={<Account />} />
                <Route path="/*" element={<NotFound />} />
                {/* </LayoutWrapper> */}
              </Routes>
            </div>
          </AuthGuard>
        </ModalProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

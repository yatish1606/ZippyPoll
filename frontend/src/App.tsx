import React, { Fragment, useEffect, useState } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import AddEditModal from './components/AddEditModal'
import AuthGuard from './components/AuthGuard'
import SearchBar from './components/SearchBar'
import Sidebar from './components/Sidebar'
import { ModalContext } from './context'
import { Home } from './layout'

function App(): JSX.Element {

  const [showAddEditModal, setShowAddEditModal] = useState<boolean>(false)
  const toggleModal = () => {
    console.log('toggling', showAddEditModal)
    setShowAddEditModal(state => !state)
  }
  const [modalType, setModalType] = useState<string>('')

  const [modalElement, setModalElement] = useState<JSX.Element | null>(null)

  const renderModalToggler = () => {
    // toggleModal()
    setShowAddEditModal(true)
    console.log(showAddEditModal)
    switch (modalType) {
      case 'ADD':
        setModalElement(<AddEditModal title='Create new poll' canShow={showAddEditModal} updateModalState={() => setShowAddEditModal(false)} isAdd={true} />)
        break
    }
  }

  useEffect(renderModalToggler, [modalType])

  return (

    <HashRouter>
      <Route path="/" exact component={() => <div>home</div>} />
      <AuthGuard>
        {/* <ModalContext.Provider value={{ showAddEditModal, toggleModal }}> */}
        <Fragment>
          <div className='w-screen h-screen flex flex-row'>
            <Sidebar />
            <div className="flex-1 flex-col flex">
              <SearchBar />
              <Switch>
                <Route path="/home" exact component={() => <Home modalToggler={setModalType} />} />
              </Switch>
            </div>
            {/* {modalElement} */}
          </div>
        </Fragment>
        {/* </ModalContext.Provider> */}
      </AuthGuard>
    </HashRouter>


  )
}

export default App

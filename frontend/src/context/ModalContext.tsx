import React, { useEffect, useState, useContext, createContext } from 'react'

const ModalContext = createContext<{ modalName: string, setModal: (modalName: string) => any }>({
    modalName: '',
    setModal: (modalName: string) => { }
})

const ModalProvider = ({ children }: { children: any }) => {

    const [modalName, setModalName] = useState<string>('')

    useEffect(() => {
        setModal('')
    }, [])

    const setModal = (modalName: string) => setModalName(modalName)

    return (
        <ModalContext.Provider value={{ modalName, setModal }}>
            {children}
        </ModalContext.Provider>
    )
}
const useModal = () => useContext(ModalContext)

export {
    ModalProvider,
    useModal
}

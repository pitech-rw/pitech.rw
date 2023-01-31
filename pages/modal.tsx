import React, {useState } from 'react'

const ModalContext = React.createContext<(() => void)| undefined>(undefined)
const Modal = ({ children }: any) => {
    const [isvisible, setIsVisible] = useState(false)

    const openModal = () => {
        setIsVisible(true)
    }

    const closeModal = () => {
        setIsVisible(false)
    }

    return (
        <ModalContext.Provider value={openModal}>
            {
                isvisible && (
                    <div>
                        <div>
                            <button onClick={closeModal}>&times;</button>
                            {children}
                        </div>
                    </div>
                )
            }
        </ModalContext.Provider>
    )
}
export {ModalContext, Modal}
import React, { useState } from 'react';

//const ModalContext = React.createContext<(() => void)| undefined>(undefined)
const Modal = ({ children }: any) => {
  const [isvisible, setIsVisible] = useState(false);

  const openModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <div>
      {isvisible && (
        <div>
          <div>
            <button onClick={closeModal}>&times;</button>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
export default Modal;

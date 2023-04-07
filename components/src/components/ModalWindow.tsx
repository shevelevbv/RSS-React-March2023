import React from 'react';

interface IPropsType {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}
const ModalWindow: React.FC<IPropsType> = ({ showModal, setShowModal }) => {
  return <div className="modal-window" onClick={() => setShowModal(!showModal)}></div>;
};

export default ModalWindow;

import React from 'react';
import { ICard } from '../helpers/interfaces';

interface IPropsType {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  selectedCard: ICard;
}
const ModalWindow: React.FC<IPropsType> = ({ showModal, setShowModal, selectedCard }) => {
  return (
    <div className="modal-window">
      <div className="modal-mask" onClick={() => setShowModal(!showModal)}></div>
      <div className="modal-content">
        <img src={selectedCard.img} alt={selectedCard.title} />
      </div>
    </div>
  );
};

export default ModalWindow;

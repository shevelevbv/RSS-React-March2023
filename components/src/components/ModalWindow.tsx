import React from 'react';
import { ICard } from '../helpers/interfaces';

interface IPropsType {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  selectedCard: ICard;
}
const ModalWindow: React.FC<IPropsType> = ({ showModal, setShowModal, selectedCard }) => {
  return (
    <div className="modal-window" onClick={() => setShowModal(!showModal)}>
      <div>
        <img src={selectedCard.img} alt={selectedCard.title} />
      </div>
    </div>
  );
};

export default ModalWindow;

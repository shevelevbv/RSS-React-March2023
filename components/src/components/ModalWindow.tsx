import React from 'react';
import { ICard } from '../helpers/interfaces';

interface IPropsType {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  selectedCard: ICard;
}
const ModalWindow: React.FC<IPropsType> = ({ showModal, setShowModal, selectedCard }) => {
  return (
    <section className="modal-window">
      <div className="modal-mask" onClick={() => setShowModal(!showModal)}></div>
      <article className="modal-content">
        <div className="modal-content__image-frame">
          <img src={selectedCard.img} alt={selectedCard.title} />
        </div>
      </article>
    </section>
  );
};

export default ModalWindow;

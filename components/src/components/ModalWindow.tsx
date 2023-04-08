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
          <img src={selectedCard.img} alt={selectedCard.description} />
        </div>
        <div className="modal-content__data">
          <div className="modal-content__data_description">
            <h2>Description</h2>
            <p>
              {selectedCard.description ? selectedCard.description : 'No description for this card'}
            </p>
          </div>
        </div>
        <button onClick={() => setShowModal(!showModal)}>&#10005;</button>
      </article>
    </section>
  );
};

export default ModalWindow;

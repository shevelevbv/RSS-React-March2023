import React from 'react';
import { ICard } from '../helpers/interfaces';
import InstagramLogo from '../assets/svg/instagram.svg';
import TwitterLogo from '../assets/svg/twitter.svg';
import BookLogo from '../assets/svg/book.svg';
import CalendarLogo from '../assets/svg/calendar.svg';
import UserLogo from '../assets/svg/user.svg';
import HeartLogo from '../assets/svg/heart.svg';

interface IPropsType {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  selectedCard: ICard;
}
const ModalWindow: React.FC<IPropsType> = ({ showModal, setShowModal, selectedCard }) => {
  const transformDate = (date: string): string => {
    const inputDate: Date = new Date(date);
    return inputDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <section className="modal-window" role="section">
      <div className="modal-mask" onClick={() => setShowModal(!showModal)}></div>
      <article className="modal-content">
        <div className="modal-content__image-frame">
          <img src={selectedCard.img} alt={selectedCard.description} />
        </div>
        <div className="modal-content__data">
          <div className="modal-content__data__description">
            <div className="modal-content__data__logo">
              <img src={BookLogo} alt="book logo" />
            </div>
            <p>
              {selectedCard.description ? selectedCard.description : 'No description for this card'}
            </p>
          </div>
          <div className="modal-content__data_date">
            <div className="modal-content__data__logo">
              <img src={CalendarLogo} alt="book logo" />
            </div>
            <p>{transformDate(selectedCard.date_created)}</p>
          </div>
          <div className="modal-content__data_likes">
            <div className="modal-content__data__logo">
              <img src={HeartLogo} alt="heart logo" />
            </div>
            <p>{selectedCard.likes}</p>
          </div>
          <div className="modal-content__data_user">
            <div className="modal-content__data__logo">
              <img src={UserLogo} alt="user logo" />
            </div>
            <div className="modal-content__data_user_details">
              <div className="modal-content__data_user_info">
                <div>
                  <img src={selectedCard.profile_pic} alt={selectedCard.user} />
                </div>
                <p>{selectedCard.user}</p>
              </div>
              {selectedCard.portfolio_url && (
                <a href={selectedCard.portfolio_url} role="portfolio-link">
                  <button>view portfolio</button>
                </a>
              )}
              <div className="modal-content__data_user_details__logos">
                {selectedCard.instagram && (
                  <div>
                    <a href={`https://www.instagram.com/${selectedCard.instagram}`}>
                      <img src={InstagramLogo} alt="Instagram logo" />
                    </a>
                  </div>
                )}
                {selectedCard.twitter && (
                  <div>
                    <a href={`https://www.twitter.com/${selectedCard.twitter}`}>
                      <img src={TwitterLogo} alt="Twitter logo" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <button role="button-close" onClick={() => setShowModal(!showModal)}>
          &#10005;
        </button>
      </article>
    </section>
  );
};

export default ModalWindow;

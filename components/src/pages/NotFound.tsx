import React from 'react';
import '../styles/NotFound.scss';
import {Link} from "react-router-dom";

class NotFound extends React.Component {
  render = (): JSX.Element => {
    return (
      <main className="main_not-found">
        <section className="container_not-found">
          <h1>Oops! The page does not exist</h1>
          <p>
            Please use the options in the menu above or go the the <Link to="/">Home</Link> page.
          </p>
        </section>
        <div className="image_not-found">
          <img src="./src/assets/svg/NotFound.svg" alt="Not found" />
        </div>
      </main>
    );
  };
}

export default NotFound;

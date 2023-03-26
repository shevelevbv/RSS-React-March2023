import React from 'react';

interface IPropsType {
  consentInput: React.RefObject<HTMLInputElement>;
}
class ConsentInput extends React.Component<IPropsType> {
  constructor(props: IPropsType) {
    super(props);
  }
  render = () => {
    return (
      <div>
        <input type="checkbox" id="consent" className="form__consent__input" ref={this.props.consentInput} />
        <label htmlFor="consent">I hereby consent to the processing of my personal data</label>
      </div>
    );
  };
}

export default ConsentInput;

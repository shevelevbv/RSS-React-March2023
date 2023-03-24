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
      <>
        <input type="checkbox" id="consent" ref={this.props.consentInput} />
        <label htmlFor="consent">I hereby consent to the processing of my personal data*</label>
      </>
    );
  };
}

export default ConsentInput;

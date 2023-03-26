import React from 'react';

interface IPropsType {
  maleRadioInput: React.RefObject<HTMLInputElement>;
  femaleRadioInput: React.RefObject<HTMLInputElement>;
  otherRadioInput: React.RefObject<HTMLInputElement>;
}

class GenderRadioInputs extends React.Component<IPropsType> {
  constructor(props: IPropsType) {
    super(props);
  }
  render = () => {
    return (
      <fieldset className="form__gender__inputs">
        <div className="form__gender__input">
          <input type="radio" name="gender" value="male" ref={this.props.maleRadioInput} />
          <label>Male</label>
        </div>
        <div className="form__gender__input">
          <input type="radio" name="gender" value="female" ref={this.props.femaleRadioInput} />
          <label>Female</label>
        </div>
        <div className="form__gender__input">
          <input type="radio" name="gender" value="other" ref={this.props.otherRadioInput} />
          <label>Other</label>
        </div>
      </fieldset>
    );
  };
}

export default GenderRadioInputs;

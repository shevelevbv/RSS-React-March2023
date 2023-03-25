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
        <label className="form__gender__label">
          <input type="radio" name="gender" value="male" ref={this.props.maleRadioInput} />
          <span>Male</span>
        </label>
        <label className="form__gender__label">
          <input type="radio" name="gender" value="female" ref={this.props.femaleRadioInput} />
          <span>Female</span>
        </label>
        <label className="form__gender__label">
          <input type="radio" name="gender" value="other" ref={this.props.otherRadioInput} />
          <span>Other</span>
        </label>
      </fieldset>
    );
  };
}

export default GenderRadioInputs;

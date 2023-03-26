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
          <input
            type="radio"
            name="gender"
            value="male"
            id="input-male"
            role="male-input"
            ref={this.props.maleRadioInput}
          />
          <label htmlFor="input-male">Male</label>
        </div>
        <div className="form__gender__input">
          <input
            type="radio"
            name="gender"
            value="female"
            id="input-female"
            ref={this.props.femaleRadioInput}
          />
          <label htmlFor="input-female">Female</label>
        </div>
        <div className="form__gender__input">
          <input
            type="radio"
            name="gender"
            value="other"
            id="input-other"
            ref={this.props.otherRadioInput}
          />
          <label htmlFor="input-other">Other</label>
        </div>
      </fieldset>
    );
  };
}

export default GenderRadioInputs;

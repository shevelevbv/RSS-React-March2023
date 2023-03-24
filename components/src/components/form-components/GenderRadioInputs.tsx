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
      <div>
        <fieldset>
          <legend>Select your gender*: </legend>
          <label>
            <input type="radio" name="gender" value="male" ref={this.props.maleRadioInput} />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" ref={this.props.femaleRadioInput} />
            Female
          </label>
          <label>
            <input type="radio" name="gender" value="other" ref={this.props.otherRadioInput} />
            Other
          </label>
        </fieldset>
      </div>
    );
  };
}

export default GenderRadioInputs;

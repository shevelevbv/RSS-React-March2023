import React from 'react';

interface IPropsType {
  dateInput: React.RefObject<HTMLInputElement>;
}
class DateInput extends React.Component<IPropsType> {
  constructor(props: IPropsType) {
    super(props);
  }
  render = () => {
    return (
      <div>
        <label htmlFor="date" className="form__label">
          Date of birth:
        </label>
        <input type="date" ref={this.props.dateInput} id="date" />
      </div>
    );
  };
}

export default DateInput;

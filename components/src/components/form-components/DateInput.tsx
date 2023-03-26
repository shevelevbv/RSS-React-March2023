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
      <div className="form__date">
        <input
          type="date"
          ref={this.props.dateInput}
          id="date"
          className="form__input form__input_date"
        />
      </div>
    );
  };
}

export default DateInput;

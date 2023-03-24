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
        <label>
          Date of birth*: <input type="date" ref={this.props.dateInput} />
        </label>
      </div>
    );
  };
}

export default DateInput;

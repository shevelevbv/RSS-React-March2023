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
      <>
        <label>
          Date of birth*: <input type="date" ref={this.props.dateInput} />
        </label>
      </>
    );
  };
}

export default DateInput;
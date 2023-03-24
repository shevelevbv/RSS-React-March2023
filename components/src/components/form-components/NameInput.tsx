import React from 'react';

interface IPropsType {
  nameInput: React.RefObject<HTMLInputElement>;
}
class NameInput extends React.Component<IPropsType> {
  constructor(props: IPropsType) {
    super(props);
  }
  render = () => {
    return (
      <>
        <label>
          First name*: <input type="text" ref={this.props.nameInput} />
        </label>
      </>
    );
  };
}


export default NameInput;

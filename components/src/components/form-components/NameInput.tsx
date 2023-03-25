import React from 'react';

interface IPropsType {
  nameInput: React.RefObject<HTMLInputElement>;
  text: string;
}
class NameInput extends React.Component<IPropsType> {
  constructor(props: IPropsType) {
    super(props);
  }
  render = () => {
    return (
      <div>
        <label>
          {this.props.text}* <input type="text" ref={this.props.nameInput} />
        </label>
      </div>
    );
  };
}

export default NameInput;

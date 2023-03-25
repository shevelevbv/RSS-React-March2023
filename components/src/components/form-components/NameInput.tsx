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
          <input
            type="text"
            ref={this.props.nameInput}
            placeholder={this.props.text}
            className="form__name__input"
          />
        </label>
      </div>
    );
  };
}

export default NameInput;

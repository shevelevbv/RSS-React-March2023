import React from 'react';

interface IPropsType {
  fileInput: React.RefObject<HTMLInputElement>;
}
class FileInput extends React.Component<IPropsType> {
  constructor(props: IPropsType) {
    super(props);
  }
  render = () => {
    return (
      <div>
        <label htmlFor="file" className="form__label">
          Your profile picture:
        </label>
        <input
          id="file"
          className="form__input form__input_file"
          type="file"
          ref={this.props.fileInput}
        />
      </div>
    );
  };
}

export default FileInput;

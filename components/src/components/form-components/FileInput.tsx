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
        <label>
          Your profile picture*:
          <input type="file" ref={this.props.fileInput} />
        </label>
      </div>
    );
  };
}

export default FileInput;

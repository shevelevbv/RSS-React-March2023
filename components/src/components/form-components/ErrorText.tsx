import React from 'react';

interface IPropsType {
  errorMessage: string | undefined;
}
class FileInput extends React.Component<IPropsType> {
  constructor(props: IPropsType) {
    super(props);
  }
  render = () => {
    return <div>{this.props.errorMessage && <p>{this.props.errorMessage}</p>}</div>;
  };
}

export default FileInput;
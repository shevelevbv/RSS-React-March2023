import React, {ChangeEvent} from 'react';

class Search extends React.Component {
  state = {
    value: '',
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  componentWillUnmount = (): void => {
    const savedSearchValue = this.state.value;
    localStorage.setItem('searchValue', savedSearchValue);
  };

  componentDidMount = (): void => {
    const savedSearchValue: string | null = localStorage.getItem('searchValue');
    if (savedSearchValue) {
      this.setState({ value: savedSearchValue });
    }
  };

  render = (): JSX.Element => {
    return (
      <div>
        <input type={'text'} onChange={this.handleInputChange} value={this.state.value} />
      </div>
    );
  };
}

export default Search;
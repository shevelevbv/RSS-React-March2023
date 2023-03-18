import React, { ChangeEvent } from 'react';

interface ISearchState {
  value: string;
}

class Search extends React.Component {
  state: ISearchState = {
    value: '',
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ value: event.target.value });
  };

  componentWillUnmount = (): void => {
    localStorage.setItem('searchValue', this.state.value);
  };

  componentDidMount = (): void => {
    const savedSearchValue: string | null = localStorage.getItem('searchValue');
    if (savedSearchValue) {
      this.setState({ value: savedSearchValue });
    }
  };

  render = (): JSX.Element => {
    return (
      <div className={'search'}>
        <input
          className={'search__input'}
          type={'text'}
          onChange={this.handleInputChange}
          value={this.state.value}
          placeholder={'Search for tea'}
          autoFocus={true}
        />
      </div>
    );
  };
}

export default Search;

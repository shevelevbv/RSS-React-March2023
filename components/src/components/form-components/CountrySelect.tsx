import React from 'react';

interface IPropsType {
  countrySelect: React.RefObject<HTMLSelectElement>
}
class CountrySelect extends React.Component<IPropsType> {
  constructor(props: IPropsType) {
    super(props);
  }
  render = () => {
    return (
      <>
        <label htmlFor="country-select">Select your country*:</label>
        <select id="country-select" ref={this.props.countrySelect}>
          <option value="">Please choose an option</option>
          <option value="Belarus">Belarus</option>
          <option value="Georgia">Georgia</option>
          <option value="Kazakhstan">Kazakhstan</option>
          <option value="Kyrgyzstan">Kyrgyzstan</option>
          <option value="Poland">Poland</option>
          <option value="Russia">Russia</option>
          <option value="Ukraine">Ukraine</option>
        </select>
      </>
    );
  };
}

export default CountrySelect;

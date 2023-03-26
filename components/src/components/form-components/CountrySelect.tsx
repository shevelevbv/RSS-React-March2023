import React from 'react';

interface IPropsType {
  countrySelect: React.RefObject<HTMLSelectElement>;
}
class CountrySelect extends React.Component<IPropsType> {
  constructor(props: IPropsType) {
    super(props);
  }
  render = () => {
    return (
      <div>
        <select
          id="country"
          ref={this.props.countrySelect}
          className="form__input form__input_country"
        >
          <option value="">Choose the country</option>
          <option value="Belarus">Belarus</option>
          <option value="Georgia">Georgia</option>
          <option value="Kazakhstan">Kazakhstan</option>
          <option value="Kyrgyzstan">Kyrgyzstan</option>
          <option value="Poland">Poland</option>
          <option value="Russia">Russia</option>
          <option value="Ukraine">Ukraine</option>
        </select>
      </div>
    );
  };
}

export default CountrySelect;

import {ErrorOption} from "react-hook-form";

export interface ICard {
  id: number;
  title: string;
  img: string;
  country: string;
  year: number;
  season: string;
  variety: string;
  stock: number;
  favorite: string;
  price: number;
}

export interface IErrors {
  name?: ErrorOption;
  lastName?: ErrorOption;
  date?: ErrorOption;
  country?: ErrorOption;
  consent?: ErrorOption;
  gender?: ErrorOption;
  file?: ErrorOption;
}

export interface IFormState {
  submitted: boolean;
  errors: IErrors;
}

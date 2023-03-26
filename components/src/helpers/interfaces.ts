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
  name?: string;
  lastName?: string;
  date?: string;
  country?: string;
  consent?: string;
  gender?: string;
  file?: string;
}

export interface IFormState {
  submitted: boolean;
  errors: IErrors;
}

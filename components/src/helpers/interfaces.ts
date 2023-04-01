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
  name?: { message: string };
  lastName?: { message: string };
  date?: { message: string };
  country?: { message: string };
  consent?: { message: string };
  gender?: { message: string };
  file?: { message: string };
}

export interface IFormState {
  submitted: boolean;
  errors: IErrors;
}

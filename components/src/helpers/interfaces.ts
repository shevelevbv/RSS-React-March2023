import { ErrorOption } from 'react-hook-form';

export interface ICard {
  id: string;
  img: string;
  description: string;
  likes: number;
  user: string;
  instagram: string;
  twitter: string;
  profile_pic: string;
  portfolio_url: string;
  date_created: string;
  width: number;
  height: number;

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

interface IUnsplashUserProfileImage {
  small: string;
  medium: string;
  large: string;
}

interface IUnsplashUserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
}

interface IUnsplashUser {
  id: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  instagram_username: string;
  twitter_username: string;
  portfolio_url: string;
  profile_image: IUnsplashUserProfileImage;
  links: IUnsplashUserLinks;
}

interface IUnsplashUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

interface IUnsplashLinks {
  self: string;
  html: string;
  download: string;
}

export interface IUnsplashResult {
  id: string;
  created_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  description: string;
  user: IUnsplashUser;
  current_user_collections: Array<IUnsplashData>;
  urls: IUnsplashUrls;
  links: IUnsplashLinks;
}

export interface IUnsplashData {
  total: number;
  total_pages: number;
  results: Array<IUnsplashResult>;
}

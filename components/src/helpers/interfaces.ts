import { ErrorOption } from 'react-hook-form';

export interface ICard {
  id: string;
  img: string;
  description: string;
  likes: number;
  user: string;
  instagram: string | null;
  twitter: string | null;
  profile_pic: string;
  portfolio_url: string | null;
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

export interface ISelectedCardData {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  downloads: number;
  likes: number;
  liked_by_user: boolean;
  public_domain: boolean;
  description: string;
  exif: {
    make: string;
    model: string;
    name: string;
    exposure_time: string;
    aperture: string;
    focal_length: string;
    iso: number;
  };
  location: {
    city: string;
    country: string;
    position: {
      latitude: number;
      longitude: number;
    };
  };
  tags: Array<{ title: string }>;
  current_user_collections: [
    {
      id: number;
      title: string;
      published_at: string;
      last_collected_at: string;
      updated_at: string;
      cover_photo: string | null;
      user: string | null;
    }
  ];
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  user: {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    portfolio_url: string;
    bio: string;
    location: string;
    total_likes: number;
    total_photos: number;
    total_collections: number;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
    };
  };
}

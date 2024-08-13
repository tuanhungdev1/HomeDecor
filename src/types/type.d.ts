export interface IMenuItem {
  id: string;
  title: string;
  url: string;
}

export interface IImageSlide {
  id: string;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount: number;
  imageProduct: string;
  isNew: boolean;
  rating: number;
}

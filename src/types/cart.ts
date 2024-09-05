export interface TResponseCart {
  id?: number;
  products: TCartProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface TCartProduct {
  id?: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  thumbnail: string;
}

export interface TCart {
  id?: number;
  products: TCartProduct[];
  total: number;
  userid?: number;
  totalProducts: number;
  totalQuantity: number;
}

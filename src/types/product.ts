export interface TResponseProduct {
  products: TProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface TProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  thumbnail: string;
  images: string[];
  rating: number;
  reviews: TReview[];
}

export interface TReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

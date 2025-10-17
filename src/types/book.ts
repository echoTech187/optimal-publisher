export interface Book {
  id: number;
  title: string;
  slug: string;
  author: string;
  cover: string;
  description: string;
  price: number;
  category: {
    id: number;
    category: string;
  };
  book_writters: {
    id: number;
    name: string;
  }[];
}
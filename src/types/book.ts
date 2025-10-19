export interface Book {
  book_authors: any;
  isbn?: string;
  id: number;
  title: string;
  slug: string;
  author: string;
  cover: string;
  cover_size: string;
  page_length: number | string;
  series?: string;
  edition?: string;
  description: string;
  price: number;
  publisher: {
    name: ""
  },
  category: {
    id: number;
    category: string;
  };
  book_writters: any;
  reading: {
    name: string;
  },
  type: {
    name: string;
  },
  media: {
    name: string;
  },
  library: {
    name: string;
  }
}
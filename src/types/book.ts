import { JSX } from "react";

export interface Book {
  book_authors: any[];
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
  
  categories: {
    id: number;
    category: string;
  };
  book_writters: any[];
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
  },
  created_at?: string;
  updated_at?: string;
  created_by?: string;
}

export interface BookCategories {
  id: number;
  category: string;
}

export interface BookAuthors {
  id: number;
  name: string;
}
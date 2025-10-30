export interface Article {
  id: number;
  title: string;
  slug: string;
  image: string;
  article_category: ArticleCategory;
  created_at: string;
  description: string;
  create_by_user?: Member | null;
}

export interface ArticleCategory {
  id: number;
  category: string;
}

export interface Member {
  id: number;
  full_name: string;
}
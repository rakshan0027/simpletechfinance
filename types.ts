export type Category = 'Tech News' | 'Finance Basics';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: Category;
  date: string;
  summary: string;
  content: string; // HTML string or Markdown text
  author: string;
  tags?: string[];
}

export interface SEOMetadata {
  title: string;
  description: string;
}
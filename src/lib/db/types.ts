/**
 * 书签类型定义
 */
export interface Bookmark {
  id: string;
  title: string;
  url: string;
  category: string;
  tags: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookmarkInput {
  title: string;
  url: string;
  category?: string;
  tags?: string[];
  description?: string;
}
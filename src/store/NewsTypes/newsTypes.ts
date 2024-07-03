export interface Article {
  category: string;
  title: string;
  url: string;
  image: string;
  date: string;
  body: string;
  source: string;
  author: string;
}

export interface selectedFilterType {
  value: string,
  lable: string
}

export interface NewsState {
  news: {
    articles: Article[];
    filteredData: Article[];
    loading: boolean;
    error: string | null;
  },
  pagination: {
    currentPage: number;
    itemsPerPage: number;
  },
  filterOptions: {
    selectedCategory: string[];
    selectedAuthor: string[];
    selectedSortBy: string;
    selectedSortOrder: string;
  }
}

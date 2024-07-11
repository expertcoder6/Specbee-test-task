import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFetchNews } from '../services';
import { Article, FilterOptionsType, NewsState } from '../NewsTypes/newsTypes';
import { RootState } from '../store';



const initialState: NewsState = {
  news: {
    articles: [],
    filteredData: [],
    loading: true,
    error: null,
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 5,
  },
  filterOptions: {
    categoryOptions: [],
    authorOptions: [],
  },
  selectedFilterOptions: {
    selectedCategory: [],
    selectedAuthor: [],
    selectedSortBy: 'date',
    selectedSortOrder: 'asc'
  }

};
const constructFilterOptions = (data: Article[]): FilterOptionsType => {
  const categoryArr: string[] = [];
  const authorArr: string[] = [];

  data.forEach(item => {
    if (item.source && !categoryArr.includes(item.source.toLowerCase())) {
      categoryArr.push(item.source.toLowerCase());
    }

    if (item.author && !authorArr.includes(item.author.toLowerCase())) {
      authorArr.push(item.author.toLowerCase());
    }
  });

  return { categoryArr, authorArr, data };
};

export const fetchNews = createAsyncThunk<FilterOptionsType, void, { state: RootState }>(
  'news/fetchNews',
  async () => {
    const data = await getFetchNews();
    return constructFilterOptions(data)
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.pagination.currentPage = action.payload;
    },
    setSelectedCategory(state, action) {
      if (state.selectedFilterOptions.selectedCategory)
        state.selectedFilterOptions.selectedCategory = [...action.payload];
    },
    setSelectedAuthor(state, action) {
      if (state.selectedFilterOptions.selectedAuthor)
        state.selectedFilterOptions.selectedAuthor = [...action.payload];
    },
    setSelectedSortBy(state, action) {
      state.selectedFilterOptions.selectedSortBy = action.payload;
    },
    setSelectedSortOrder(state, action) {
      state.selectedFilterOptions.selectedSortOrder = action.payload;
    },
    setFilteredData(state, action) {
      state.news.filteredData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.news.loading = true;
        state.news.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.news.loading = false;
        state.news.articles = action.payload.data;
        state.news.filteredData = action.payload.data
        state.filterOptions.authorOptions = action.payload.authorArr
        state.filterOptions.categoryOptions = action.payload.categoryArr
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.news.loading = false;
        state.news.error = action.error.message || 'Failed to fetch news';
      });
  },
});

export const {
  setCurrentPage,
  setSelectedCategory,
  setSelectedAuthor,
  setSelectedSortBy,
  setFilteredData,
  setSelectedSortOrder
} = newsSlice.actions;

export default newsSlice.reducer;

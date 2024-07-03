import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFetchNews } from '../services';
import { Article, NewsState } from '../NewsTypes/newsTypes';
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
    selectedCategory: [],
    selectedAuthor: [],
    selectedSortBy: 'date',
    selectedSortOrder: 'asc'
  }

};

export const fetchNews = createAsyncThunk<Article[], void, { state: RootState }>(
  'news/fetchNews',
  async () => {
    const data = await getFetchNews();
    return data as Article[];
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
      if (state.filterOptions.selectedCategory)
        state.filterOptions.selectedCategory = [...action.payload];
    },
    setSelectedAuthor(state, action) {
      if (state.filterOptions.selectedAuthor)
        state.filterOptions.selectedAuthor = [...action.payload];
    },
    setSelectedSortBy(state, action) {
      state.filterOptions.selectedSortBy = action.payload;
    },
    setSelectedSortOrder(state, action) {
      state.filterOptions.selectedSortOrder = action.payload;
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
        state.news.articles = action.payload;
        state.news.filteredData = action.payload
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

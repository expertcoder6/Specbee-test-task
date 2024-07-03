import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typedDispatch";
import {
  fetchNews,
  setCurrentPage,
  setFilteredData,
} from "../../store/NewsSlice/NewsSlice";
import ArticleCard from "../../components/NewsCard/NewsCard";
import SidebarFilter from "../../components/Sidebar/Sidebar";
import "./Home.scss";
import Pagination from "../../components/Pagination/Pagination";
import FilterSkelton from "../../components/Skeltons/FilterSkelton/FilterSkelton";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import CardsSkelton from "../../components/Skeltons/CardSkelton/CardsSkelton";

const HomePage = () => {
  const dispatch = useAppDispatch();

  const {
    articles,
    filteredData,
    loading,
    error,
  } = useAppSelector((state) => state.news.news);

  const {
    currentPage,
    itemsPerPage,
  } = useAppSelector((state) => state.news.pagination);

  const {
    selectedCategory,
    selectedSortBy,
    selectedSortOrder,
    selectedAuthor,
  } = useAppSelector((state) => state.news.filterOptions);




  // so we don't do unnecessary re-calculation of total pages
  const totalPages = useMemo(() => Math.ceil(filteredData.length / itemsPerPage), [filteredData, itemsPerPage]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);


  const filterNews = () => {
    let data = articles;

    if (selectedCategory?.length > 0) {
      data = data.length > 0 ? data.filter((article) => selectedCategory.includes(article.source.toLowerCase())) : [];
    }
    if (selectedAuthor?.length > 0) {
      data = data.filter((article) => selectedAuthor.includes(article.author.toLowerCase()));
    }
    dispatch(setFilteredData(data));
  };


  const sortNews = () => {
    if (!selectedSortBy) {
      return;
    }

    let sortedData = [...filteredData];

    if (selectedSortBy === 'date') {
      sortedData.sort((a, b) =>
        selectedSortOrder === 'desc' ? new Date(b.date).getTime() - new Date(a.date).getTime() : new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (selectedSortBy === 'title') {
      sortedData.sort((a, b) => (selectedSortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));
    }

    dispatch(setFilteredData(sortedData));
  };

  useEffect(() => {
    filterNews();
  }, [selectedCategory, selectedAuthor]);

  useEffect(() => {
    sortNews();
  }, [selectedSortBy, selectedSortOrder]);


  console.log(44, selectedCategory);

  const paginationdata = useMemo(() => {
    if (filteredData) {
      return filteredData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
    }
    return [];
  }, [currentPage, itemsPerPage, filteredData]);


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home-page">
      <div className="sidebar">
        {loading ? <FilterSkelton /> : <SidebarFilter />}
      </div>
      <div className="main-content">
        {loading ? <CardsSkelton /> :
          (<>
            <div className="news-cards">
              {paginationdata.map((article, index) => (
                <ArticleCard key={index} {...article} />
              ))}
            </div>

            {paginationdata?.length == 0 && <NoDataFound />}
          </>)
        }
        {paginationdata?.length > 0 && <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />}

      </div>
    </div>
  );
};

export default HomePage;

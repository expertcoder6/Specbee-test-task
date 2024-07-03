import "./Sidebar.scss";
import {
  setSelectedAuthor,
  setSelectedCategory,
  setSelectedSortBy,
  setSelectedSortOrder,
} from "../../store/NewsSlice/NewsSlice";
import { Author, CatagoryData, SortBy } from "../../data/SideBarData";
import { useAppSelector, useAppDispatch } from "../../hooks/typedDispatch";

const SidebarFilter = () => {
  const dispatch = useAppDispatch();

  const {
    selectedCategory,
    selectedSortBy,
    selectedSortOrder,
    selectedAuthor,
  } = useAppSelector((state) => state.news.filterOptions);

  const handleNewsCategoryChange = (category: string) => {
    category = category.toLowerCase();
    if (selectedCategory.includes(category)) {
      const catogerylist = selectedCategory.filter((cat) => cat !== category);
      dispatch(setSelectedCategory(catogerylist));
    } else {
      const catogerylist = [...selectedCategory, category];
      dispatch(setSelectedCategory(catogerylist));
    }
  };

  const handleNewsAuthorChange = (author: string) => {
    author = author.toLowerCase();
    if (selectedAuthor.includes(author)) {
      const authorList = selectedAuthor.filter((item) => item !== author);
      dispatch(setSelectedAuthor(authorList));
    } else {
      const authorList = [...selectedAuthor, author];
      dispatch(setSelectedAuthor(authorList));
    }
  };

  const handleNewsSortChange = (sortBy: string) => {
    if (selectedSortBy) {
      if (selectedSortBy == sortBy) {
        dispatch(setSelectedSortBy(sortBy));
        dispatch(
          setSelectedSortOrder(selectedSortOrder == "asc" ? "desc" : "asc")
        );
      } else {
        dispatch(setSelectedSortBy(sortBy));
        dispatch(setSelectedSortOrder("asc"));
      }
    }
  };

  return (
    <div className="sidebar-filter">
      <h3>Category</h3>
      <div className="filter-group">
        {CatagoryData.map((category) => (
          <div className="filter-item" key={category.value}>
            <input
              type="checkbox"
              checked={selectedCategory.includes(category?.value)}
              onChange={() => handleNewsCategoryChange(category?.value)}
            />
            <span>{category?.lable}</span>
          </div>
        ))}
      </div>

      <h3>Author</h3>
      <div className="filter-group">
        {Author?.map((author) => (
          <div className="filter-item" key={author.value}>
            <input
              type="checkbox"
              checked={selectedAuthor.includes(author?.value.toLowerCase())}
              onChange={() => handleNewsAuthorChange(author?.value)}
            />
            <span>{author?.lable}</span>
          </div>
        ))}
      </div>

      <h3>Sort By</h3>
      <div className="filter-group">
        {SortBy.map((sortby) => (
          <div className="filter-item" key={sortby.value}>
            <input
              type="checkbox"
              checked={selectedSortBy === sortby?.value}
              onChange={() => handleNewsSortChange(sortby?.value)}
            />
            <span>{sortby?.lable}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarFilter;

import "./Sidebar.scss";
import {
  setSelectedAuthor,
  setSelectedCategory,
  setSelectedSortBy,
  setSelectedSortOrder,
} from "../../store/NewsSlice/NewsSlice";
import { SortBy } from "../../data/SideBarData";
import { useAppSelector, useAppDispatch } from "../../hooks/typedDispatch";

const SidebarFilter = ({ handleSidebarOpen = () => { } }) => {
  const dispatch = useAppDispatch();

  const {
    selectedCategory,
    selectedSortBy,
    selectedSortOrder,
    selectedAuthor,
  } = useAppSelector((state) => state.news.selectedFilterOptions);

  const {
    categoryOptions,
    authorOptions,
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
      <div className="sidebar-close" onClick={handleSidebarOpen}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="close-icon" viewBox="0 0 24 24">
          <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
        </svg>
      </div>
      <h3>Category</h3>
      <div className="filter-group">
        {categoryOptions.map((category,i) => (
          <div className="filter-item" key={i}>
            <input
              type="checkbox"
              checked={selectedCategory.includes(category)}
              onChange={() => handleNewsCategoryChange(category)}
            />
            <span>{category}</span>
          </div>
        ))}
      </div>

      <h3>Author</h3>
      <div className="filter-group">
        {authorOptions?.map((author,i) => (
          <div className="filter-item" key={i}>
            <input
              type="checkbox"
              checked={selectedAuthor.includes(author.toLowerCase())}
              onChange={() => handleNewsAuthorChange(author.toLowerCase())}
            />
            <span>{author}</span>
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

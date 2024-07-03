import './FilterSkelton.scss'

const FilterSkelton = () => {
  return (
    <div className="sidebar-filter">
      <h3 className="skeleton-h3" />
      <div className="filter-group">
        {Array(5).fill(0).map((_, index) => (
          <div className="filter-item" key={index}>
            <div className="skeleton-checkbox" />
            <span className="skeleton-label" />
          </div>
        ))}
      </div>

      <h3 className="skeleton-h3" />
      <div className="filter-group">
        {Array(5).fill(0).map((_, index) => (
          <div className="filter-item" key={index}>
            <div className="skeleton-checkbox" />
            <span className="skeleton-label" />
          </div>
        ))}
      </div>

      <h3 className="skeleton-h3" />
      <div className="filter-group">
        {Array(5).fill(0).map((_, index) => (
          <div className="filter-item" key={index}>
            <div className="skeleton-checkbox" />
            <span className="skeleton-label" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FilterSkelton
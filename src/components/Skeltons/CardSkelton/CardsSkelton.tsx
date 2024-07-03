import './CardsSkelton.scss'
const CardsSkelton = () => {
  return (
    <div className="loading-container">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="news-card loading-skeleton">
          <div className="news-head">
            <div className="image-box">
              <div className="skeleton-image"></div>
            </div>
            <div className="content-box">
              <div className="skeleton-header">
                <div className="skeleton-date"></div>
                <div className="skeleton-source"></div>
              </div>
              <h2 className="skeleton-title"></h2>
            </div>
          </div>
          <div className="news-content">
            <p className="skeleton-body"></p>
            <p className="skeleton-author"></p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CardsSkelton
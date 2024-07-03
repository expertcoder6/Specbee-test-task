import './NoDataFound.scss'

const NoDataFound = () => {
  return (
    <div className="not-found">
      <h2>No data found</h2>
      <p>We couldn't find any data matching your search criteria.</p>
      <button className="btn">Try again</button>
    </div>
  )
}

export default NoDataFound
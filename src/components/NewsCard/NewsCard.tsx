import React from "react";
import "./NewsCard.scss";
import { BASEAPIURL } from "../../store/services";

interface NewsCardProps {
  title: string;
  url: string;
  image: string;
  date: string;
  body: string;
  source: string;
  author: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  image,
  date,
  body,
  source,
  author,
}) => {

  return (
    <div className="news-card">
    <div className="news-head">
      <div className="image-box">
        <img
          src={BASEAPIURL+image}
          alt=""
          className="news-image"
        />
      </div>
      <div className="content-box">
        <div className="news-header">
          <span className="news-date">{date}</span>
          <span className="news-source">{source}</span>
        </div>
        <h2 className="news-title">{title}</h2>
      </div>
    </div>
    <div className="news-content">
      <span className="news-body">
      <div dangerouslySetInnerHTML={{ __html: body }} />
      </span>
      <span className="news-author">{author}</span>
    </div>
  </div>
  );
};

export default NewsCard;

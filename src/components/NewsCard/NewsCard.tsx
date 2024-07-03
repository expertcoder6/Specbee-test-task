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

const newsCard: React.FC<NewsCardProps> = ({
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
            src={`${BASEAPIURL}${image}`}
            alt={title}
            className="news-image"
          />
        </div>
        <div className="content-box">
          <div className="news-header">
            <p className="news-date">{date}</p>
            <p className="news-source">{source}</p>
          </div>
          <h2 className="news-title">{title}</h2>
        </div>
      </div>

      <div className="news-content">
        <p className="news-body">{body}</p>
        <p className="news-author">{author}</p>
      </div>
    </div>
  );
};

export default newsCard;

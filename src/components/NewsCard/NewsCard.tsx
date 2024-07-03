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
  const newsContent = `
    <div class="news-card">
      <div class="news-head">
        <div class="image-box">
          <img
            src="${BASEAPIURL}${image}"
            alt="${title}"
            class="news-image"
          />
        </div>
        <div class="content-box">
          <div class="news-header">
            <span class="news-date">${date}</span>
            <span class="news-source">${source}</span>
          </div>
          <h2 class="news-title">${title}</h2>
        </div>
      </div>
      <div class="news-content">
        <span class="news-body">${body}</span>
        <span class="news-author">${author}</span>
      </div>
    </div>
  `;

  return (
    <div dangerouslySetInnerHTML={{ __html: newsContent }} />
  );
};

export default NewsCard;

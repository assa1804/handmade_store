import React from "react";
import "./LatestNews.css";
import test from '../images/test.jpg';

function LatestNews() {
  const newsData = [
    {
      id: 1,
      title: "Hot Deals",
      date: "Dec 12, 2024",
      comments: "0 Comments",
      description:
        "Discover unbeatable offers on your favorite handmade goods! Don't miss out on these limited-time discounts to grab the best deals today!",
      image: test,
    },
    {
      id: 2,
      title: "Trending Items",
      date: "Nov 30, 2024",
      comments: "0 Comments",
      description:
        "Explore the most popular handmade items that everyone is talking about. From unique designs to must-have pieces, shop what’s trending now!",
      image: test,
    },
    {
      id: 3,
      title: "Monthly Events",
      date: "Nov 11, 2024",
      comments: "0 Comments",
      description:
        "Join us for exciting monthly events featuring new collections, exclusive sales, and special activities for all handmade lovers!",
      image: test,
    },
  ];

  return (
    <div className="latest-news">
      <h2>Latest News</h2>
      <div className="news-container">
        {newsData.map((news) => (
          <div key={news.id} className="news-card">
            <img src={news.image} alt={news.title} />
            <h3>{news.title}</h3>
            <p className="meta">
              {news.date} • {news.comments}
            </p>
            <p>{news.description}</p>
          </div>
        ))}
      </div>
      <button className="see-more">See More</button>
    </div>
  );
}

export default LatestNews;

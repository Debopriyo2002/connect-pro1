import React from "react";
import "./Widgets.css";
import InfoIcon from "@material-ui/icons/Info";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

function Widgets() {
  // Define an array of news articles
  const newsArticles = [
    { heading: "The Full Stack Junkie Is Back", subtitle: "Top news - 9099 readers" },
    { heading: "Coronavirus: UK updates", subtitle: "Top news - 886 readers" },
    { heading: "Bitcoin Breaks $22K", subtitle: "Crypto - 8K readers" },
    { heading: "JavaScript Mastery", subtitle: "Code - 1.2M readers" },
    { heading: "Tesla hits new highs", subtitle: "Cars & auto - 300 readers" },
    { heading: "AI overtaking the World", subtitle: "Top news - 13K readers" },
  ];

  // Function to get a random subset of news articles
  const getRandomNewsArticles = (count) => {
    const shuffledArticles = newsArticles.sort(() => 0.5 - Math.random()); // Shuffle the array
    return shuffledArticles.slice(0, count); // Get the first 'count' articles
  };

  const randomNewsArticles = getRandomNewsArticles(3); // Get 3 random news articles

  const newsArticle = (heading, subtitle) => (
    <div className="widgets-article">
      <div className="widgets-articleLeft">
        <FiberManualRecordIcon />
      </div>
      <div className="widgets-articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="widgets">
      <div className="widgets-header">
        <h2>Connect-Pro News</h2>
        <InfoIcon />
      </div>

      {randomNewsArticles.map((article, index) => (
        <div key={index}>
          {newsArticle(article.heading, article.subtitle)}
        </div>
      ))}
    </div>
  );
}

export default Widgets;

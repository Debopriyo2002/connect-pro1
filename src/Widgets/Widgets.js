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
    { heading: "Apple's AirTag 2 release pushed back to 2025", subtitle: "Tech news - 1K readers" },
    { heading: "Whats the strategy behind the acquisition of game development tools like “Twinmotion” by Epic Games?", subtitle: "Gaming news - 1.3K readers" },
    { heading: "10 essential cybersecurity cheat sheets available for free", subtitle: "Tech news - 1.7K readers" },
    { heading: "Top Job after BCA", subtitle: "Tech news - 7.1K readers" },
  ];

  // Function to get a random subset of news articles
  const getRandomNewsArticles = (count) => {
    const shuffledArticles = newsArticles.sort(() => 0.5 - Math.random()); // Shuffle the array
    return shuffledArticles.slice(0, count); // Get the first 'count' articles
  };

  const randomNewsArticles = getRandomNewsArticles(5); // Get 5 random news articles

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

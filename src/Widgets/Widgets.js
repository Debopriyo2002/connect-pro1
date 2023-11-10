import React from "react";
import "./Widgets.css";
import InfoIcon from "@material-ui/icons/Info";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

function Widgets() {
  // Define an array of news articles
  const newsArticles = [
    { heading: "Champions League Final Ends in Nail-biting Penalty Shootout Victory.", subtitle: "SkySport" },
    { heading: "Emerging Talent Signs Multi-Million Dollar Contract with Premier League Club.", subtitle: "SkySport" },
    { heading: "National Team Coach Resigns Amidst Controversy, Successor Yet to Be Named.", subtitle: "Mirror.co" },
    { heading: "FIFA Announces Plans for Expanded World Cup Format, Sparking Global Debate.", subtitle: "T.O.I" },
    { heading: "Injury Concerns Loom as Star Forward Suffers Ankle Sprain in Friendly Match.", subtitle: "Mirror.co" },
    { heading: "Tottenham vs Chelsea: The wildest first half in Premier League history?", subtitle: "SkySport" },
    { heading: "Chelsea want Jean-Clair Todibo to replace Thiago Silva who is set to leave at end of season - Paper Talk", subtitle: "SkySport" },
    { heading: "Liverpool's Luis Diaz's parents kidnapped in Colombia", subtitle: "Mirror.co" },
    { heading: "No Neymar, but Mumbai City face another stern Al Hilal test", subtitle: "T.O.I" },
    { heading: "Lionel Messi's Barcelona teammate explains why superstar is not good example to follow", subtitle: "Mirror.co" },
    { heading: "BOOK: BRIGHT YOUNG WOMEN ", subtitle: "Jessica Knoll" },
    { heading: "BOOK: A Season on the Brink", subtitle: "John Feinstein" },
    { heading: "Loose Balls", subtitle: "Johns carbora" },
    { heading: "BOOK: TREMOR", subtitle: "Teju Cole" },
    { heading: "BOOK :THE HALT DURING THE CHASE ", subtitle: "Rosemary Tonks" },
  ];


  const getRandomNewsArticles = (count) => {
    const shuffledArticles = newsArticles.sort(() => 0.5 - Math.random());
    return shuffledArticles.slice(0, count); 
  };

  const randomNewsArticles = getRandomNewsArticles(4);

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

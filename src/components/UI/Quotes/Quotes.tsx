"use client";

import React, { useState, useEffect } from "react";
import { quotesData } from "./QuotesData";
import "./quotesStyles.css";

const Quotes = () => {
  const [quote, setQuote] = useState({ text: "", author: "" });

  useEffect(() => {
    // Function to set a random quote
    const updateQuote = () => {
      const randomQuote =
        quotesData[Math.floor(Math.random() * quotesData.length)];

      setQuote(randomQuote);
    };

    // Set initial quote
    updateQuote();

    // Update the quote every 5 seconds
    const intervalId = setInterval(updateQuote, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="gardening-quote w-full h-fit lg:h-[120px]">
      <p>&quot;{quote.text}&quot;</p>
      <h4>- {quote.author || "Unknown"}</h4>
    </div>
  );
};

export default Quotes;

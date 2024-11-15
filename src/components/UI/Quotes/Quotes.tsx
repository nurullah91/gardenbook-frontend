"use client";

import React, { useState, useEffect } from "react";
import { quotesData } from "./QuotesData";

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
    <div className="w-full h-fit my-5 text-center p-2 rounded-md shadow-lg shadow-default-300 bg-default-50">
      <p className="text-xs italic">&quot;{quote.text}&quot;</p>
      <h4 className="text-xs font-bold mt-2">- {quote.author || "Unknown"}</h4>
    </div>
  );
};

export default Quotes;

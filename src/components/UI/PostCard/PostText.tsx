"use client";

import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

interface IPostContentProps {
  postContent: string;
  maxLength?: number; // Optional: Maximum length of characters to show initially
}

export default function PostText({
  postContent,
  maxLength = 300,
}: IPostContentProps) {
  const [sanitizedHTML, setSanitizedHTML] = useState("");
  const [isExpanded, setIsExpanded] = useState(false); // Track whether the full text is shown

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sanitized = DOMPurify.sanitize(postContent);

      setSanitizedHTML(sanitized);
    }
  }, [postContent]);

  // Truncate the text if it's longer than maxLength and not expanded
  const truncateText = (html: string, maxLength: number): string => {
    if (html.length <= maxLength || isExpanded) return html;

    return html.slice(0, maxLength) + "...";
  };

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div>
      {/* Render the truncated or full sanitized HTML */}
      <div
        dangerouslySetInnerHTML={{
          __html: truncateText(sanitizedHTML, maxLength),
        }}
      />
      {/* Show the "See More" or "See Less" button if the text is longer than maxLength */}
      {sanitizedHTML.length > maxLength && (
        <button
          onClick={handleToggle}
          className="text-blue-500 hover:underline mt-2"
        >
          {isExpanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
}

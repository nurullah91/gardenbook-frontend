"use client";

import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

interface IPostContentProps {
  postContent: string;
}
export default function PostText({ postContent }: IPostContentProps) {
  const [sanitizedHTML, setSanitizedHTML] = useState("");

  useEffect(() => {
    // This ensures DOMPurify runs only on the client side
    if (typeof window !== "undefined") {
      const sanitized = DOMPurify.sanitize(postContent);

      setSanitizedHTML(sanitized);
    }
  }, [postContent]);

  // Sanitize the HTML content
  //   const sanitizedPost = DOMPurify.sanitize(postContent);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
}

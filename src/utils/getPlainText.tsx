/**
 * Utility function to strip HTML tags from a string and truncate the text after a word limit.
 *
 * @param {string} htmlText - The string containing HTML tags.
 * @param {number} wordLimit - The maximum number of words to display (default is 15).
 * @returns {string} - The plain text with HTML tags removed and truncated if necessary.
 */
export function getPlainText(htmlText: string, wordLimit: number = 15): string {
  // Function to remove HTML tags
  const stripHtmlTags = (html: string): string => {
    const tempDiv = document.createElement("div");

    tempDiv.innerHTML = html;

    return tempDiv.innerText || tempDiv.textContent || "";
  };

  // Function to truncate text after a specified word limit
  const truncateText = (text: string, limit: number): string => {
    const words = text.split(" ");

    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }

    return text;
  };

  // Clean the HTML content by stripping the tags
  const plainText = stripHtmlTags(htmlText);

  // Truncate the text if it's longer than the word limit
  return truncateText(plainText, wordLimit);
}

export function getPlainText(htmlText: string, wordLimit: number = 15): string {
  // Clean the HTML content by stripping the tags using a regex
  const plainText = htmlText.replace(/<[^>]+>/g, "");

  // Truncate the text if it's longer than the word limit
  const words = plainText.split(" ");

  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : plainText;
}

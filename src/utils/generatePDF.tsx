export const generatePDF = async (id: string) => {
  const html2pdf = require("html2pdf.js");

  const element = document.getElementById(id);
  const options = {
    margin: 0,
    filename: "gardenbook-article.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().from(element).set(options).save();
};

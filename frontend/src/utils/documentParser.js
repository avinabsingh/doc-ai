import * as pdfjsLib from 'pdfjs-dist'; 
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
 
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// Extracts raw text from a PDF File object.
export const extractTextFromPDF = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  let fullText = '';
  
  //   extract the text
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += pageText + ' \n';
  }
  
  return fullText.trim();
};

// Convert image to Base64 data URL.
export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
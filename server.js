const Tesseract = require('tesseract.js');
const axios = require('axios');
const fs = require('fs');

async function solveCaptchaFromURL(url) {
  try {
    // Download the image
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const imageData = Buffer.from(response.data, 'binary');

    // Save the image locally (optional, for debugging purposes)
    fs.writeFileSync('captcha.png', imageData);

    // Use Tesseract to recognize the text in the image
    const result = await Tesseract.recognize(imageData, {
      lang: 'eng',
      tessedit_char_whitelist: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    });

    // Clean up the recognized text and return it
    const text = result.text.replace(/[^a-zA-Z0-9]/g, '');
    return text;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Example usage:
(async () => {
  const url = ' https://i.ibb.co/R4BB4DW/Captcha-Bajaj.jpg';
  const captcha = await solveCaptchaFromURL(url);
  console.log(captcha);
})();
      
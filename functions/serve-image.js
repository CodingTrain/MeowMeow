const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const filePath = path.join(__dirname, 'a3f5c11b2/meowmeow-square.png');
  const imageBuffer = fs.readFileSync(filePath);

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'image/png' },
    body: imageBuffer.toString('base64'),
    isBase64Encoded: true,
  };
};

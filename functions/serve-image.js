const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    const imagePath = path.join(__dirname, 'meowmeow-square.png');
    const imageBuffer = fs.readFileSync(imagePath);
    return {
      statusCode: 200,
      body: imageBuffer.toString('base64'),
      headers: {
        'Content-Type': 'image/png',
      },
      isBase64Encoded: true,
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

let lastRequestTime = Date.now();
const keepAliveInterval = 1000 * 60 * 5; 

// Middleware để giữ kết nối keep-alive
app.use((req, res, next) => {
  res.setHeader('Connection', 'keep-alive');
  next();
});

// Route chính
app.get('/', (req, res) => {
  lastRequestTime = Date.now();
  res.send('Your server has been hacked!');
});

// Gửi request đến server khác mỗi 5 phút
setInterval(async () => {
  try {
    const response = await axios.get(process.env.KEEP_ALIVE_URL);
    console.log('Keep-alive request received:', response.data);
  } catch (error) {
    console.error('Error receiving keep-alive request:', error.message);
  }
}, keepAliveInterval); // Gửi yêu cầu mỗi 5 phút

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

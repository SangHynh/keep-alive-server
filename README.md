# ENSURE CONNECTION STAYS ACTIVE FOR FREE RENDER DEPLOYMENT
## START THIS SERVER ALONG WITH THE SERVER YOU WANT TO KEEP ALIVE

Create `keepalive.middleware.js` 

```bash
const axios = require('axios');
require('dotenv').config(); 

const keepAliveMiddleware = async (req, res, next) => {
  try {
    const response = await axios.get(`${process.env.KEEP_ALIVE_URL}`);     
    console.log('Request received from keep-alive-server:', response.data);
  } catch (error) {
    console.error('Error receiving request from keep-alive-server:', error.message);
  }
  next();
};

module.exports = keepAliveMiddleware;
```
Use middleware in `server.js`

```bash
const express = require("express");
require("dotenv").config();
const keepAliveMiddleware = require("./middlewares/keepalive.middleware");

const app = express();
app.use(keepAliveMiddleware);
```

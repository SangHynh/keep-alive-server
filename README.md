# ENSURE CONNECTION STAYS ACTIVE FOR FREE RENDER DEPLOYMENT
## START THIS SERVER ALONG WITH THE SERVER YOU WANT TO KEEP ALIVE

### Step1. Run keep-alive-server
`npm run dev`
### Step2: Configure the middleware on your server

Create `middleware/keepalive.middleware.js` 

```bash
const axios = require('axios');
require('dotenv').config(); 

const keepAliveMiddleware = async (req, res, next) => {
  try {
    const response = await axios.get(`${process.env.KEEP_ALIVE_URL}`);     
    console.log('Response received from keep-alive-server:', response.data);
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

// Use the keep-alive middleware
app.use(keepAliveMiddleware);

// Start your server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

```
### Step 3: Run your server and wait to be hacked


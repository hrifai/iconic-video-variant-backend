const express = require('express');
const app = express();
const controller = require('./controller');
const dotenv = require('dotenv');

dotenv.config();
app.use(express.json());

app.get('/variant-search', (req,res) => controller.getSearchResults(req,res));

app.listen(process.env.PORT, () => {
    console.log(`SERVER LISTENING ON PORT ${process.env.PORT}`);
});

module.exports = app;
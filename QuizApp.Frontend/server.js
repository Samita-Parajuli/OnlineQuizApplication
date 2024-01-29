const express = require('express');
const app = express();

app.use(express.static('public'));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})

const cors = require("cors");

app.use(cors());

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

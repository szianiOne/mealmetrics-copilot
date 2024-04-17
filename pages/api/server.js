const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use("/openai", require("./router"));

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

const {sequelize, User, UserGroup, Group, Note, Keyword} = require("./models/models")
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.listen(8080, () => {
    console.log('Server started on port 8080...')
})
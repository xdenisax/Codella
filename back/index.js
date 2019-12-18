const {sequelize, User, UserGroup, Group, Note, Keyword} = require("./models/models")
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

user = {
    "id": 1,
    "name": "teo",
    "phone": 0,
    "email": "teo@gmail",
    "password": "pass"
}

User.create(user).then( () => {
    return 0;
})

app.listen(8080, () => {
    console.log('Server started on port 8080...')
})

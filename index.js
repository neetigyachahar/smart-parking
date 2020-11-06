const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const MONGODB_URI = "";

const user = require('./routes/user');
const admin = require('./routes/admin');

app.use((req, res, next) => {
    console.log(Date.now(), req.originalUrl);
    // if (req.originalUrl.startsWith("/feed/profile")) {
    //     console.log(true);
    //     setTimeout(() => {
    //         next();
    //     }, 30000);
    // } else {
    next();
    // }
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use(admin);
app.use(user);


mongoose
    .connect(MONGODB_URI, { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false })
    .then(result => {
        console.log("Database connected!");
        app.listen(5555, err => console.log(`Server rocks on ${5555}`));
    })
    .catch(err => {
        console.log(err);
    });
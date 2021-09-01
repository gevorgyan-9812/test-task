var express = require('express');
const helmet = require("helmet");
var cors = require('cors');
var app = express();
var port = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(helmet());

var Users = require('./routes/Users');

app.use('/users', Users);

app.listen(port);

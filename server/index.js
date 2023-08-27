const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    key: "username",
    secret: "secretSetting",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 24 // lasts 24 hours (in s)
    }
}))

// routes
app.use('/', require('./routes/fetch'));
app.use('/register', require('./routes/register'));
app.use('/log', require('./routes/log'));
app.use('/auth', require('./routes/auth'));

app.listen(3001, () => {
    console.log('Server running on port 3001');
});  
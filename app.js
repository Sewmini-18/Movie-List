const express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
//const methodOverride = require('method-override');
const session = require('express-session');
const app = express();
const mysql      = require('mysql');
let bodyParser=require("body-parser");
let connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : '',
              database : 'test'
            });
 
connection.connect();
 
global.db = connection;
 
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))

// app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: 3600000 }
            }))
 
// development only
 
app.get('/', routes.index);//call for main index page
app.get('/signup', user.signup);//call for signup page
app.post('/signup', user.signup);//call for signup post 
app.get('/login', routes.index);//call for login page
app.post('/login', user.login);//call for login post
app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
app.get('/home/logout', user.logout);//call for logout
app.get('/home/profile',user.profile);//to render users profile
app.get('/home/list',user.list);//to render users movie list
app.get('/home/wishlist',user.wishlist);//to render users wishlist
app.get('/home/list/details/:id',user.details);//to render users movie details
app.get('/home/list/deletemovie/:id',user.deletemovie);//delete
app.get('/home/list/editmovie/:id',user.editmovie);//to render users edit movie
app.get('/home/list/addmovie',user.addmovie);//to render users add movie
app.post('/home/list/addmovie',user.addmovie);//to render users addmovie
app.post('/home/list/updatemovie/:id',user.updatemovie);//to render users update
//Middleware
app.listen(8080)

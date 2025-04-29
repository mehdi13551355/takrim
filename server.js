//importing dependencies
const express = require("express")
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
const session = require('express-session');
const bcrypt = require('bcryptjs');
// const User = require('./models/User');

const app = express();
const PORT = 3000;

// mongoose.connect('mongodb://localhost:27017/authsession', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

app.set('view engine','ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
  secret: 'my-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }
}));

app.get("/",function(req,res){
    res.render("login");
});

// صفحه ثبت نام
app.get("/register.ejs",function(req,res){
    res.render("register.ejs");
});

// ثبت نام
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({ username, password: hashedPassword });
    res.redirect('/login');
  } catch (err) {
    res.send('Error: Username already exists');
  }
});

// صفحه لاگین
app.get("/login.ejs",function(req,res){
    res.render("login.ejs");
});

// لاگین
app.post('/login', async (req, res) => {
  // const { username, password } = req.body;
  // const user = await User.findOne({ username });

  // if (user && await bcrypt.compare(password, user.password)) {
  //   req.session.user = user.username;
   res.redirect('/main');
  // } else {
    // res.send('Login Failed');
  // }
});

// Middleware چک کردن Session
function isAuthenticated(req, res, next) {
  if (req.session.user) next();
  else res.redirect('/login');
}

// صفحه 
app.get('/main', (req, res) => {
    res.render("main.ejs");
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

  

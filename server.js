const express = require('express');
const session = require('express-session');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { findUserBycodemeli, createUser, findUserByshkhadmat } = require('./models/user.js');

const app = express();

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.get("/", function (req, res) {
  res.render('login', { error: '' });
});

// صفحه ثبت نام
app.get("/register", function (req, res) {
  res.render('register', { error: '' });
});

app.get("/login", function (req, res) {
  res.render('login', { error: '' });
});

app.get("/main", function (req, res) {
  if (req.session.codemeliid) 
    res.render('main',{ codemeli: req.session.codemeliid });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

app.post('/register', async (req, res) => {
  const { codemeli, email, passwrd, passwrdcom } = req.body;
  const user = await findUserBycodemeli(codemeli);
  if (user) return res.render('register', { error: 'فردی با کد ملی فبلا ثبت نام کرده است' });
  const hashed = await bcrypt.hash(passwrd, 10);
  await createUser(codemeli, email, hashed);
  res.render('login', { error: '' })
});

app.post('/login', async (req, res) => {

  const { codemeli, passwrd } = req.body;

  const user = await findUserBycodemeli(codemeli);

  if (!user) return res.render('login', { error: 'کاربری با این کد ملی یافت نشد لطفا ثبت نام کنید.' });
  const match = await bcrypt.compare(passwrd, user.passwrd);
  if (!match) return res.render('login', { error: 'رمز عبور اشتباه است' });
  req.session.codemeliid = codemeli;
  res.redirect('/main');

});

app.get('/partial/:page', async (req, res) => {
  const page = req.params.page;
  if (page == "karshnas")
    res.render(page, { error: '' });
  if (page == "prkhadamat")
    res.render(page, { error: '' });
  if (page == "prkhadamattabale") {
    const rw = await findUserByshkhadmat(req.query.id, req.session.codemeliid)
    if (rw)
    {
      res.render(page, {rw:rw});
    }
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

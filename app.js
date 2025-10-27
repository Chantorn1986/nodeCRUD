const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'nodesecret',
  resave: false,
  saveUninitialized: true
}))

app.use('/', require('./routes/index'));
app.use('/logIO', require('./routes/login'));
app.use('/ecg', require('./routes/ecatalog'));
app.use('/pac', require('./routes/pac'));

app.listen(3000, () => {
  console.log("Server is running...");
});
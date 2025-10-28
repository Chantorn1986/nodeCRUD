const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
// const bodyparser = require('body-parser')

app.use(express.json());
// app.use(bodyparser.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'nodesecret',
  resave: false,
  saveUninitialized: true
}))


app.post('/user',(req,res)=>{
  res.send(req.body)
})

app.use('/', require('./routes/index'));
app.use('/logIO', require('./routes/login'));
app.use('/ecg', require('./routes/ecatalog'));
app.use('/pac', require('./routes/pac'));
app.use('/hrm', require('./routes/hrm'));

app.listen(3000, () => {
  console.log("Server is running...");
});
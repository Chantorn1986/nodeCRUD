const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/crud', require('./routes/index'));

// app.use('/admin', require('./routes/ecatalog/adminIndex'));
app.use('/', require('./routes/ecatalog'));

app.listen(3000, () => {
  console.log("Server is running...");
});
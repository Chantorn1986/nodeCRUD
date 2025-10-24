const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/ecg', require('./routes/ecatalog'));
app.use('/brands', require('./routes/brands'));

app.listen(3000, () => {
  console.log("Server is running...");
});
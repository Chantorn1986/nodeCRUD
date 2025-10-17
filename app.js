const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/crud', require('./routes/index.js'));
app.use('/', require('./routes/ecatalog.js'));

app.listen(3000, () => {
    console.log("Server is running...");
});
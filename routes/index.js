// 1. นำเข้า Express
const express = require('express');
// 2. สร้าง Router instance
const router = express.Router();
router.use(express.json());
const path = require('path');
const db = require('../db/db');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({ storage });

// 3. กำหนดเส้นทาง (Routes)
router.get('/t', (req, res) => {
  const sql = "SELECT * FROM `eCatalogBrands`";

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
    // res.render('home', {
    //   title: 'Home',
    //   products: results
    // });
  })
});

router.get('/', (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, results) => {
    if (err) throw err;

    res.render('home', {
      title: 'Home',
      products: results
    });
  })
});

router.post('/create', upload.single('image'), (req, res) => {
  const { name, description } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = "INSERT INTO products (name, description, image) VALUES(?, ?, ?)";
  db.query(sql, [name, description, image], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  })
})

router.get('/edit/:id', (req, res) => {
  const sql = "SELECT * FROM products WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.render('edit', { product: result[0] });
  });
})

router.post('/edit/:id', upload.single('image'), (req, res) => {
  const { name, description } = req.body;
  const image = req.file ? req.file.filename : req.body.oldImage;

  const sql = "UPDATE products SET name = ?, description = ?, image = ? WHERE id = ?";
  db.query(sql, [name, description, image, req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  })
})

router.get('/delete/:id', (req, res) => {
  const sql = "DELETE FROM products WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
})

router.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

router.get('/create', (req, res) => {
  res.render('create');
})

router.get('/data', (req, res) => {
  res.send('Hello from Router Data!');
});

router.post('/data', (req, res) => {
  res.json({ message: 'Data received' });
});

// 4. ส่งออก Router
module.exports = router;
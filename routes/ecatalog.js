// 1. นำเข้า Express
const express = require('express');

// 2. สร้าง Router instance
const router = express.Router();
// router.use(express.urlencoded({ extended: true }));
const db = require("../db/db");
const moment = require('moment');
const { uploadBrands } = require('../middlewares/callFunction');

router.get('/', (req, res) => {
    try {
    // const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`";
    // db.query(sqlGetAll, (err, results) => {
    //   if (err) {
    //     return;
    //   }
    //   res.render('ecatalog/admin/brands', {
    //     title: 'Brands Management',
    //     brands: results,
    //     brandJson: JSON.stringify(results)
    //   });
    // });
    res.render('ecatalog/user/index', { title: 'Index User' });
  } catch (err) {
    console.error('Error list data :', err)
    res.status(500).json({ error: 'Index User invalid.' })
  }
  
});

router.get('/admin', (req, res) => {
  res.render('ecatalog/admin/index', { title: 'Index Admin' });
});

router.get('/admin/brands', (req, res) => {
  try {
    const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`";
    db.query(sqlGetAll, (err, results) => {
      if (err) throw err;
      // res.render('ecatalog/admin/brands', {
      //   title: 'Brands Management',
      //   brands: results,
      //   brandJson: JSON.stringify(results)
      // });
            const data = [
        {
        title: 'Brands Management',
        brands: results,
        // brandJson: JSON.stringify(results)
        }
      ]
      res.json(data)
    });
  } catch (err) {
    console.error('Error list data :', err)
    res.status(500).json({ error: 'List departments invalid.' })
  }
});

// 4. ส่งออก Router
module.exports = router;
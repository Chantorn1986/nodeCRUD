// 1. นำเข้า Express
const express = require('express');
// 2. สร้าง Router instance
const router = express.Router();
router.use(express.json());
const path = require('path');
const db = require('../db/db');

const { v4: uuidv4 } = require("uuid");
const moment = require('moment');
const { uploadBrands } = require('../middlewares/callFunction');

router.get('/brands', async (req, res) => {
  try {
    const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`";
    await db.query(sqlGetAll, (err, results) => {
      if (err) throw err;
      res.render('ecatalog/admin/brands', {
        title: 'Brands Management',
        brands: results,
        brandJson: JSON.stringify(results)
      });
    });
  } catch (err) {
    console.error('Error list data :', err)
    res.status(500).json({ error: 'List departments invalid.' })
  }
});




// 4. ส่งออก Router
module.exports = router;
// 1. นำเข้า Express
const express = require('express');

// 2. สร้าง Router instance
const router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.render('ecatalog/user/index', { title: 'Index User' });
});

// 4. ส่งออก Router
module.exports = router;
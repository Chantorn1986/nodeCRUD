// 1. นำเข้า Express
const express = require('express');
// 2. สร้าง Router instance
const router = express.Router(); 
const {index} = require('../controllers/ecatalog/admin/index')

router.get('/', (req, res) => {
    res.render('ecatalog/user/index', { title: 'Index User'});
});
router.get('/admin', index);

// 4. ส่งออก Router
module.exports = router;
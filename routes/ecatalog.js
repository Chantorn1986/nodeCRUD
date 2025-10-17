// 1. นำเข้า Express
const express = require('express');
// 2. สร้าง Router instance
const router = express.Router(); 
const path = require('path');
const db = require('../db/db');
const multer = require('multer');

router.get('/', (req, res) => {
    res.render('ecatalog/user/index', { title: 'Index User'});
});


// 4. ส่งออก Router
module.exports = router;
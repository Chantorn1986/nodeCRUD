const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
const{index} = require('../controllers/ecatalog/admin')

router.get('/', index)

module.exports = router;
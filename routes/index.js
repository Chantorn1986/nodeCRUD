// 1. นำเข้า Express
const express = require('express');

// 2. สร้าง Router instance
const router = express.Router(); 

// 3. กำหนดเส้นทาง (Routes)
router.get('/', (req, res) => {
    res.send('Hello from Router!');
});

router.get('/data', (req, res) => {
    res.send('Hello from Router Data!');
});

router.post('/data', (req, res) => {
    res.json({ message: 'Data received' });
});

// 4. ส่งออก Router
module.exports = router;
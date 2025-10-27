// 1. นำเข้า Express
const express = require('express');

// 2. สร้าง Router instance
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const {getAllUser,getAddUser,postAddUser,getEditUser,postEditUser,getDelUser} = require('../controllers/pac/admin/user')

router.get('/', (req, res) => {
    res.render('pac/user/index', { title: 'PAC' });
});

router.get('/admin', (req, res) => {
  res.render('pac/admin/index', { title: 'PAC Admin' });
});

router.get('/admin/user', getAllUser);
router.get('/admin/user/Add', getAddUser);
router.post('/admin/user/Add',postAddUser);
router.get('/admin/user/Edit/:id', getEditUser);
router.post('/admin/user/Edit/:id',postEditUser);
router.get('/admin/user/Del/:id', getDelUser);




// 4. ส่งออก Router
module.exports = router;
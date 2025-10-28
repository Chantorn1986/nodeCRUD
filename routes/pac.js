// 1. นำเข้า Express
const express = require('express');

// 2. สร้าง Router instance
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const {getAllUser,getAddUser,postAddUser,getEditUser,postEditUser,getDelUser} = require('../controllers/pac/admin/user')
const {isAuthenticated,ifLoggedIn} = require('../middlewares/auth')
const {getHome,getLogout,postLogin} = require('../controllers/pac/login')

router.get('/home', isAuthenticated,getHome)

router.get('/', (req, res) => {
    res.render('pac/user/index', { title: 'PAC' });
});

router.get('/admin', (req, res) => {
  res.render('pac/admin/index', { title: 'PAC Admin' });
});

router.get('/user', getAllUser);
router.get('/user/Add', getAddUser);
router.post('/user/Add',postAddUser);
router.get('/user/Edit/:id', getEditUser);
router.post('/user/Edit/:id',postEditUser);
router.get('/user/Del/:id', getDelUser);




// 4. ส่งออก Router
module.exports = router;
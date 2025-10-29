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

router.get('/admin',isAuthenticated, (req, res) => {
  res.render('pac/admin/index', { 
    title: 'PAC Admin' ,
    user: req.session.user
  });
});

router.get('/user',isAuthenticated, getAllUser);
router.get('/user/Add',isAuthenticated, getAddUser);
router.post('/user/Add',isAuthenticated,postAddUser);
router.get('/user/Edit/:id',isAuthenticated, getEditUser);
router.post('/user/Edit/:id',postEditUser);
router.get('/user/Del/:id',isAuthenticated, getDelUser);




// 4. ส่งออก Router
module.exports = router;
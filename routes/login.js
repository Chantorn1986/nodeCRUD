const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const {isAuthenticated,ifLoggedIn} = require('../middlewares/auth')
const {getHome,getLogout,postLogin} = require('../controllers/pac/login')

router.get('/home', isAuthenticated,getHome)
router.get('/logout',getLogout)
router.post('/login',postLogin)

// GET Routes
// router.get('/', (req, res) => {
//   res.render('index', { user: req.session.user });
// })

router.get('/pac', (req, res) => {
  res.render('indexPAC', { user: req.session.user });
})

router.get('/', ifLoggedIn, (req, res) => {
  res.render('pac/login');
})

module.exports = router;
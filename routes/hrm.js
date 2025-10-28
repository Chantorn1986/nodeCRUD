// 1. นำเข้า Express
const express = require('express');

// 2. สร้าง Router instance
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const {isAuthenticated,ifLoggedIn} = require('../middlewares/auth')
const {getAllWorkLevel,getAddWorkLevel,postAddWorkLevel,getEditWorkLevel,postEditWorkLevel,getDelWorkLevel} = require('../controllers/pac/hrm/admin/workLevel')
const {getAllPosition,getAddPosition,postAddPosition,getEditPosition,postEditPosition,getDelPosition} = require('../controllers/pac/hrm/admin/position')
const {getAllDepartment,getAddDepartment,postAddDepartment,getEditDepartment,postEditDepartment,getDelDepartment} = require('../controllers/pac/hrm/admin/department')
const {getAllEducationlevel,getAddEducationlevel,postAddEducationlevel,getEditEducationlevel,postEditEducationlevel,getDelEducationlevel} = require('../controllers/pac/hrm/admin/educationLevel')

router.get('/', (req, res) => {
    res.render('pac/hrm/index', { title: 'HRM' });
});

// router.get('/admin', (req, res) => {  Educationlevel   educationlevel
//   res.render('hrm/admin/index', { title: 'HRM Admin' });
// });

router.get('/workLevel', getAllWorkLevel);
router.get('/workLevel/Add', getAddWorkLevel);
router.post('/workLevel/Add',postAddWorkLevel);
router.get('/workLevel/Edit/:id', getEditWorkLevel);
router.post('/workLevel/Edit/:id',postEditWorkLevel);
router.get('/workLevel/Del/:id', getDelWorkLevel);

router.get('/position', getAllPosition);
router.get('/position/Add', getAddPosition);
router.post('/position/Add',postAddPosition);
router.get('/position/Edit/:id', getEditPosition);
router.post('/position/Edit/:id',postEditPosition);
router.get('/position/Del/:id', getDelPosition);

router.get('/department', getAllDepartment);
router.get('/department/Add', getAddDepartment);
router.post('/department/Add',postAddDepartment);
router.get('/department/Edit/:id', getEditDepartment);
router.post('/department/Edit/:id',postEditDepartment);
router.get('/department/Del/:id', getDelDepartment);

router.get('/educationlevel', getAllEducationlevel);
router.get('/educationlevel/Add', getAddEducationlevel);
router.post('/educationlevel/Add',postAddEducationlevel);
router.get('/educationlevel/Edit/:id', getEditEducationlevel);
router.post('/educationlevel/Edit/:id',postEditEducationlevel);
router.get('/educationlevel/Del/:id', getDelEducationlevel);
// 4. ส่งออก Router
module.exports = router;
// 1. นำเข้า Express
const express = require('express');

// 2. สร้าง Router instance
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const {isAuthenticated,ifLoggedIn} = require('../middlewares/auth')
const { uploadEmployee  } = require('../middlewares/callFunction');
const {getAllWorkLevel,getAddWorkLevel,postAddWorkLevel,getEditWorkLevel,postEditWorkLevel,getDelWorkLevel} = require('../controllers/pac/hrm/admin/workLevel')
const {getAllPosition,getAddPosition,postAddPosition,getEditPosition,postEditPosition,getDelPosition} = require('../controllers/pac/hrm/admin/position')
const {getAllDepartment,getAddDepartment,postAddDepartment,getEditDepartment,postEditDepartment,getDelDepartment} = require('../controllers/pac/hrm/admin/department')
const {getAllEducationlevel,getAddEducationlevel,postAddEducationlevel,getEditEducationlevel,postEditEducationlevel,getDelEducationlevel} = require('../controllers/pac/hrm/admin/educationLevel')
const {getAllEmployee,getAddEmployee,postAddEmployee,getEditEmployee,postEditEmployee,getDelEmployee} = require('../controllers/pac/hrm/admin/employee')
router.get('/', (req, res) => {
    res.render('pac/hrm/index', { title: 'HRM' });
});

// router.get('/admin', (req, res) => {  Educationlevel   educationlevel
//   res.render('hrm/admin/index', { title: 'HRM Admin' });
// });
router.get('/employee',isAuthenticated, getAllEmployee);
router.get('/employee/Add',isAuthenticated, getAddEmployee);
router.post('/employee/Add',isAuthenticated,uploadEmployee, postAddEmployee);
router.get('/employee/Edit/:id',isAuthenticated, getEditEmployee);
router.post('/employee/Edit/:id',isAuthenticated,uploadEmployee, postEditEmployee);
router.get('/employee/Del/:id',isAuthenticated, getDelEmployee);

router.get('/workLevel',isAuthenticated, getAllWorkLevel);
router.get('/workLevel/Add',isAuthenticated, getAddWorkLevel);
router.post('/workLevel/Add',isAuthenticated, postAddWorkLevel);
router.get('/workLevel/Edit/:id',isAuthenticated, getEditWorkLevel);
router.post('/workLevel/Edit/:id',isAuthenticated, postEditWorkLevel);
router.get('/workLevel/Del/:id',isAuthenticated, getDelWorkLevel);

router.get('/position',isAuthenticated, getAllPosition);
router.get('/position/Add',isAuthenticated, getAddPosition);
router.post('/position/Add',isAuthenticated, postAddPosition);
router.get('/position/Edit/:id',isAuthenticated, getEditPosition);
router.post('/position/Edit/:id',isAuthenticated, postEditPosition);
router.get('/position/Del/:id',isAuthenticated, getDelPosition);

router.get('/department',isAuthenticated, getAllDepartment);
router.get('/department/Add',isAuthenticated, getAddDepartment);
router.post('/department/Add',isAuthenticated, postAddDepartment);
router.get('/department/Edit/:id',isAuthenticated, getEditDepartment);
router.post('/department/Edit/:id',isAuthenticated, postEditDepartment);
router.get('/department/Del/:id',isAuthenticated, getDelDepartment);

router.get('/educationlevel',isAuthenticated, getAllEducationlevel);
router.get('/educationlevel/Add',isAuthenticated, getAddEducationlevel);
router.post('/educationlevel/Add',isAuthenticated, postAddEducationlevel);
router.get('/educationlevel/Edit/:id',isAuthenticated, getEditEducationlevel);
router.post('/educationlevel/Edit/:id',isAuthenticated, postEditEducationlevel);
router.get('/educationlevel/Del/:id',isAuthenticated, getDelEducationlevel);
// 4. ส่งออก Router
module.exports = router;
// 2. สร้าง Router instance
const db = require('../../../../db/db');
const moment = require('moment');

exports.getAllEmployee = async (req, res) => {
  try {
    const sqlGetAll = "SELECT `id`, `code`, `serialNumber`, `mobile`, `InternalTelephone`, `nameTH`, `nameEN`, `nickname`, `employmentType`, `startDate`, `endDate`, `reasonForLeaving`, `image`, `resignation`, `createdAt`, `updatedAt`, `positionId`, `departmentId`, `workLevelId`, `workLevel`, `userId`, `positionNameTH`, `positionNameEN`, `departmentNameTH`, `departmentNameEN`, `worklevelNameTH`, `worklevelNameEN`, `userName`, `userEmail`, `userRole` FROM `view_Employee` ";
    const [results] = await db.execute(sqlGetAll);
      res.render('pac/hrm/employee', {
        title: 'Employee Management',
        results: results,
        user: req.session.user,
        resultsJson: JSON.stringify(results)
      });
  } catch (err) {
    console.error('Error list data :', err)
    res.status(500).json({ error: 'List employee invalid.' })
  }
}

exports.getAddEmployee = async (req, res) => {
  try {
    // const sqlMaxNo = "SELECT IFNULL(MAX(`no`), 0) as `max`  FROM `employee`";
    const sqlPosition = "SELECT `id`, `no`, `nameTH`, `nameEN`, `createdAt`, `updatedAt` FROM `position`  ORDER BY `no` ASC"
    const sqlDepartment = "SELECT `id`, `no`, `nameTH`, `nameEN`, `createdAt`, `updatedAt` FROM `department`"
    const sqlWorkLevel = "SELECT `id`, `no`, `nameTH`, `nameEN`, `level`, `createdAt`, `updatedAt` FROM `worklevel` ORDER BY `no` ASC"
    const sqlUser = "SELECT `id`, `name`, `email`, `role`, `createdAt`, `updatedAt` FROM `user` ORDER BY `name` ASC"
    const [resultPosition] = await db.execute(sqlPosition)
    const [resultDepartment] = await db.execute(sqlDepartment)
    const [resultWorkLevel] = await db.execute(sqlWorkLevel)
    const [resultUser] = await db.execute(sqlUser)
    // const [result] = await db.execute(sqlMaxNo)
    res.render('pac/hrm/employeeAdd', {
      title: 'Employee Create',
      // maxNo: result[0]['max'] + 1,
      user: req.session.user,
      updatedAt: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
      dateAt: moment(new Date()).format('YYYY-MM-DD'),
      position: resultPosition,
      department: resultDepartment,
      worklevel: resultWorkLevel,
      user: resultUser
    });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get create employee invalid.' })
  }
}

exports.postAddEmployee = async (req, res) => {
  try {
    const { employeeNo, employeeNameTH, employeeNameEN } = req.body;
    const sqlInsert = "INSERT INTO `employee`(`id`, `no`, `nameTH`, `nameEN`, `updatedAt`) VALUES (UUID(),?,?,?,?)"
    const sqlGetAll = "SELECT `id`, `code`, `serialNumber`, `mobile`, `InternalTelephone`, `nameTH`, `nameEN`, `nickname`, `employmentType`, `startDate`, `endDate`, `reasonForLeaving`, `image`, `resignation`, `createdAt`, `updatedAt`, `positionId`, `departmentId`, `workLevelId`, `workLevel`, `userId`, `positionNameTH`, `positionNameEN`, `departmentNameTH`, `departmentNameEN`, `worklevelNameTH`, `worklevelNameEN`, `userName`, `userEmail`, `userRole` FROM `view_Employee";
    const timestamp = moment(new Date()).format()
    await db.execute(sqlInsert,
      [ employeeNo, employeeNameTH, employeeNameEN, timestamp]);
    const [results] = await db.execute(sqlGetAll);
      res.render('pac/hrm/employee', {
        title: 'Employee Management',
        results: results,
        user: req.session.user,
        resultsJson: JSON.stringify(results)
      });
  } catch (err) {
    console.error('Error post data :', err)
    res.status(500).json({ error: 'Post create employee invalid.' })
  }
}

exports.getEditEmployee = async (req, res) => {
  try {
    const sqlSelectOne = "SELECT `id`, `code`, `serialNumber`, `mobile`, `InternalTelephone`, `nameTH`, `nameEN`, `nickname`, `employmentType`, `startDate`, `endDate`, `reasonForLeaving`, `image`, `resignation`, `createdAt`, `updatedAt`, `positionId`, `departmentId`, `workLevelId`, `workLevel`, `userId`, `positionNameTH`, `positionNameEN`, `departmentNameTH`, `departmentNameEN`, `worklevelNameTH`, `worklevelNameEN`, `userName`, `userEmail`, `userRole` FROM `view_Employee` WHERE `id` = ?"
    const [result] = await db.execute(sqlSelectOne, [req.params.id]);
        const coverDate = {
          createdAt: result[0].createdAt ? moment(result[0].createdAt).format('DD/MM/YYYY HH:mm:ss') : undefined,
          updatedAt: result[0].updatedAt ? moment(result[0].updatedAt).format('DD/MM/YYYY HH:mm:ss') : undefined,
          timestamp: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
        }
        res.render('pac/hrm/employeeEdit', {
          title: 'Employee Edit',
          result: result[0],
          user: req.session.user,
          coverDate: coverDate
        });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get update employee invalid.' })
  }
}

exports.postEditEmployee = async (req, res) => {
  try {
    const { employeeNoE, employeeNameTHE, employeeNameENE } = req.body;
    const sqlGetAll = "SELECT `id`, `code`, `serialNumber`, `mobile`, `InternalTelephone`, `nameTH`, `nameEN`, `nickname`, `employmentType`, `startDate`, `endDate`, `reasonForLeaving`, `image`, `resignation`, `createdAt`, `updatedAt`, `positionId`, `departmentId`, `workLevelId`, `workLevel`, `userId`, `positionNameTH`, `positionNameEN`, `departmentNameTH`, `departmentNameEN`, `worklevelNameTH`, `worklevelNameEN`, `userName`, `userEmail`, `userRole` FROM `view_Employee";
    const sqlUpdate = "UPDATE `employee` SET `no`=?,`nameTH`=?,`nameEN`=?,`updatedAt`=? WHERE `id` = ?"
    const timestamp = moment(new Date()).format()
    await db.execute(sqlUpdate,
      [employeeNoE, employeeNameTHE, employeeNameENE, timestamp , req.params.id] );
    const [results] = await db.execute(sqlGetAll);
      res.render('pac/hrm/employee', {
        title: 'Employee Management',
        results: results,
        user: req.session.user,
        resultsJson: JSON.stringify(results)
      });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get update employee invalid.' })
  }
}

exports.getDelEmployee = async (req, res) => {
  try {
    const sqlDelete = "DELETE FROM `employee` WHERE `id` = ?"
    await db.execute(sqlDelete, [req.params.id] );
    const sqlGetAll = "SELECT `id`, `code`, `serialNumber`, `mobile`, `InternalTelephone`, `nameTH`, `nameEN`, `nickname`, `employmentType`, `startDate`, `endDate`, `reasonForLeaving`, `image`, `resignation`, `createdAt`, `updatedAt`, `positionId`, `departmentId`, `workLevelId`, `workLevel`, `userId`, `positionNameTH`, `positionNameEN`, `departmentNameTH`, `departmentNameEN`, `worklevelNameTH`, `worklevelNameEN`, `userName`, `userEmail`, `userRole` FROM `view_Employee ";
    const [results] = await db.execute(sqlGetAll);
      res.render('pac/hrm/employee', {
        title: 'Employee Management',
        results: results,
        user: req.session.user,
        resultsJson: JSON.stringify(results)
      });
  } catch (err) {
    console.error('Error get remove data :', err)
    res.status(500).json({ error: 'Get remove employee invalid.' })
  }
}
// 2. สร้าง Router instance
const db = require('../../../../db/db');
const moment = require('moment');

exports.getAllDepartment = async (req, res) => {
  try {
    const sqlGetAll = "SELECT `id`, `no`, `nameTH`, `nameEN`, DATE_FORMAT(`createdAt`, '%d/%m/%Y %H:%i:%s') as `createdAt`,DATE_FORMAT(`updatedAt`, '%d/%m/%Y %H:%i:%s') as `updatedAt` FROM `department` ";
    const [results] = await db.execute(sqlGetAll);
      res.render('pac/hrm/department', {
        title: 'Department Management',
        results: results,
        resultsJson: JSON.stringify(results)
      });
  } catch (err) {
    console.error('Error list data :', err)
    res.status(500).json({ error: 'List department invalid.' })
  }
}

exports.getAddDepartment = async (req, res) => {
  try {
    const sqlMaxNo = "SELECT IFNULL(MAX(`no`), 0) as `max`  FROM `department`";
    const [result] = await db.execute(sqlMaxNo)
    res.render('pac/hrm/departmentAdd', {
      title: 'Department Creact',
      maxNo: result[0]['max'] + 1,
      updatedAt: moment(new Date()).format('DD/MM/YYYY HH:mm:ss')
    });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get create department invalid.' })
  }
}

exports.postAddDepartment = async (req, res) => {
  try {
    const { departmentNo, departmentNameTH, departmentNameEN } = req.body;
    const sqlInsert = "INSERT INTO `department`(`id`, `no`, `nameTH`, `nameEN`, `updatedAt`) VALUES (UUID(),?,?,?,?)"
    const sqlGetAll = "SELECT `id`, `no`, `nameTH`, `nameEN`, DATE_FORMAT(`createdAt`, '%d/%m/%Y %H:%i:%s') as `createdAt`,DATE_FORMAT(`updatedAt`, '%d/%m/%Y %H:%i:%s') as `updatedAt` FROM `department` ";
    const timestamp = moment(new Date()).format()
    await db.execute(sqlInsert,
      [ departmentNo, departmentNameTH, departmentNameEN, timestamp]);
    const [results] = await db.execute(sqlGetAll);
      res.render('pac/hrm/department', {
        title: 'Department Management',
        results: results,
        resultsJson: JSON.stringify(results)
      });
  } catch (err) {
    console.error('Error post data :', err)
    res.status(500).json({ error: 'Post create department invalid.' })
  }
}

exports.getEditDepartment= async (req, res) => {
  try {
    const sqlSelectOne = "SELECT `id`, `no`, `nameTH`, `nameEN`, `createdAt`, `updatedAt` FROM `department` WHERE `id` = ?"
    const [result] = await db.execute(sqlSelectOne, [req.params.id]);
        const coverDate = {
          createdAt: result[0].createdAt ? moment(result[0].createdAt).format('DD/MM/YYYY HH:mm:ss') : undefined,
          updatedAt: result[0].updatedAt ? moment(result[0].updatedAt).format('DD/MM/YYYY HH:mm:ss') : undefined,
          timestamp: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
        }
        res.render('pac/hrm/departmentEdit', {
          title: 'Department Edit',
          result: result[0],
          coverDate: coverDate
        });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get update department invalid.' })
  }
}

exports.postEditDepartment = async (req, res) => {
  try {
    const { departmentNoE, departmentNameTHE, departmentNameENE } = req.body;
    const sqlGetAll = "SELECT `id`, `no`, `nameTH`, `nameEN`, DATE_FORMAT(`createdAt`, '%d/%m/%Y %H:%i:%s') as `createdAt`,DATE_FORMAT(`updatedAt`, '%d/%m/%Y %H:%i:%s') as `updatedAt` FROM `department` ";
    const sqlUpdate = "UPDATE `department` SET `no`=?,`nameTH`=?,`nameEN`=?,`updatedAt`=? WHERE `id` = ?"
    const timestamp = moment(new Date()).format()
    await db.execute(sqlUpdate,
      [departmentNoE, departmentNameTHE, departmentNameENE, timestamp , req.params.id] );
    const [results] = await db.execute(sqlGetAll);
      res.render('pac/hrm/department', {
        title: 'Department Management',
        results: results,
        resultsJson: JSON.stringify(results)
      });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get update department invalid.' })
  }
}

exports.getDelDepartment = async (req, res) => {
  try {
    const sqlDelete = "DELETE FROM `department` WHERE `id` = ?"
    await db.execute(sqlDelete, [req.params.id] );
    const sqlGetAll = "SELECT `id`, `no`, `nameTH`, `nameEN`, DATE_FORMAT(`createdAt`, '%d/%m/%Y %H:%i:%s') as `createdAt`,DATE_FORMAT(`updatedAt`, '%d/%m/%Y %H:%i:%s') as `updatedAt` FROM `department` ";
    const [results] = await db.execute(sqlGetAll);
      res.render('pac/hrm/department', {
        title: 'Department Management',
        results: results,
        resultsJson: JSON.stringify(results)
      });
  } catch (err) {
    console.error('Error get remove data :', err)
    res.status(500).json({ error: 'Get remove department invalid.' })
  }
}
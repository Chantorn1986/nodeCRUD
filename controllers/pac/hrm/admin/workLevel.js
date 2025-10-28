// 2. สร้าง Router instance
const db = require('../../../../db/db');
const moment = require('moment');

exports.getAllWorkLevel = async (req, res) => {
  try {
    const sqlGetAll = "SELECT `id`, `no`, `nameTH`, `nameEN`, `level`, DATE_FORMAT(`createdAt`, '%d/%m/%Y %H:%i:%s') as `createdAt`,DATE_FORMAT(`updatedAt`, '%d/%m/%Y %H:%i:%s') as `updatedAt` FROM `worklevel` ";
    const [results] = await db.execute(sqlGetAll);
      res.render('pac/hrm/workLevel', {
        title: 'Work Level Management',
        results: results,
        resultsJson: JSON.stringify(results)
      });
  } catch (err) {
    console.error('Error list data :', err)
    res.status(500).json({ error: 'List Work Level invalid.' })
  }
}

exports.getAddWorkLevel = async (req, res) => {
  try {
    const sqlMaxNo = "SELECT IFNULL(MAX(`no`), 0) as `max`  FROM `worklevel`";
    const [result] = await db.execute(sqlMaxNo)
    res.render('pac/hrm/workLevelAdd', {
      title: 'Work Level Creact',
      maxNo: result[0]['max'] + 1,
      updatedAt: moment(new Date()).format('DD/MM/YYYY HH:mm:ss')
    });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get create Work Level invalid.' })
  }
}

exports.postAddWorkLevel = async (req, res) => {
  try {
    const { workLevelNo, workLevelNameTH, workLevelNameEN, workLevelLevel } = req.body;
    const sqlInsert = "INSERT INTO `worklevel`(`id`, `no`, `nameTH`, `nameEN`, `level`, `updatedAt`) VALUES (UUID(),?,?,?,?,?)"
    const sqlGetAll = "SELECT `id`, `no`, `nameTH`, `nameEN`, `level`, DATE_FORMAT(`createdAt`, '%d/%m/%Y %H:%i:%s') as `createdAt`,DATE_FORMAT(`updatedAt`, '%d/%m/%Y %H:%i:%s') as `updatedAt` FROM `worklevel` ";
    const timestamp = moment(new Date()).format()
    await db.execute(sqlInsert,
      [ workLevelNo, workLevelNameTH, workLevelNameEN, workLevelLevel, timestamp]);
    const [results] = await db.execute(sqlGetAll);
      res.render('pac/hrm/workLevel', {
        title: 'Work Level Management',
        results: results,
        resultsJson: JSON.stringify(results)
      });
  } catch (err) {
    console.error('Error post data :', err)
    res.status(500).json({ error: 'Post create Work Level invalid.' })
  }
}

exports.getEditWorkLevel = async (req, res) => {
  try {
    const sqlSelectOne = "SELECT `id`, `no`, `nameTH`, `nameEN`, `level`, `createdAt`, `updatedAt` FROM `worklevel` WHERE `id` = ?"
    const [result] = await db.execute(sqlSelectOne, [req.params.id]);
        const coverDate = {
          createdAt: result[0].createdAt ? moment(result[0].createdAt).format('DD/MM/YYYY HH:mm:ss') : undefined,
          updatedAt: result[0].updatedAt ? moment(result[0].updatedAt).format('DD/MM/YYYY HH:mm:ss') : undefined,
          timestamp: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
        }
        res.render('pac/hrm/workLevelEdit', {
          title: 'Work Level Edit',
          result: result[0],
          coverDate: coverDate
        });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get update Work Level invalid.' })
  }
}

exports.postEditWorkLevel = async (req, res) => {
  try {
    const { workLevelNoE, workLevelNameTHE, workLevelNameENE, workLevelLevelE } = req.body;
    const sqlGetAll = "SELECT `id`, `no`, `nameTH`, `nameEN`, `level`, DATE_FORMAT(`createdAt`, '%d/%m/%Y %H:%i:%s') as `createdAt`,DATE_FORMAT(`updatedAt`, '%d/%m/%Y %H:%i:%s') as `updatedAt` FROM `worklevel` ";
    const sqlUpdate = "UPDATE `worklevel` SET `no`=?,`nameTH`=?,`nameEN`=?,`level`=?,`updatedAt`=? WHERE `id` = ?"
    const timestamp = moment(new Date()).format()
    await db.execute(sqlUpdate,
      [workLevelNoE, workLevelNameTHE, workLevelNameENE, workLevelLevelE, timestamp , req.params.id] );
    const [results] = await db.execute(sqlGetAll);
      res.render('pac/hrm/workLevel', {
        title: 'Work Level Management',
        results: results,
        resultsJson: JSON.stringify(results)
      });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get update Work Level invalid.' })
  }
}

exports.getDelWorkLevel = async (req, res) => {
  try {
    const sqlDelete = "DELETE FROM `worklevel` WHERE `id` = ?"
    await db.execute(sqlDelete, [req.params.id] );
    const sqlGetAll = "SELECT `id`, `no`, `nameTH`, `nameEN`, `level`, DATE_FORMAT(`createdAt`, '%d/%m/%Y %H:%i:%s') as `createdAt`,DATE_FORMAT(`updatedAt`, '%d/%m/%Y %H:%i:%s') as `updatedAt` FROM `worklevel` ";
    const [results] = await db.execute(sqlGetAll);
      res.render('pac/hrm/workLevel', {
        title: 'Work Level Management',
        results: results,
        resultsJson: JSON.stringify(results)
      });
  } catch (err) {
    console.error('Error get remove data :', err)
    res.status(500).json({ error: 'Get remove Work Level invalid.' })
  }
}
// 2. สร้าง Router instance
const db = require('../../../../db/db');
const moment = require('moment');

exports.getAllPosition = async (req, res) => {
  try {
    const sqlGetAll = "SELECT `id`, `no`, `nameTH`, `nameEN`, DATE_FORMAT(`createdAt`, '%d/%m/%Y %H:%i:%s') as `createdAt`,DATE_FORMAT(`updatedAt`, '%d/%m/%Y %H:%i:%s') as `updatedAt` FROM `position` ";
    const [results] = await db.execute(sqlGetAll);
      res.render('pac/hrm/position', {
        title: 'Position Management',
        results: results,
        user: req.session.user,
        resultsJson: JSON.stringify(results)
      });
  } catch (err) {
    console.error('Error list data :', err)
    res.status(500).json({ error: 'List position invalid.' })
  }
}

exports.getAddPosition = async (req, res) => {
  try {
    const sqlMaxNo = "SELECT IFNULL(MAX(`no`), 0) as `max`  FROM `position`";
    const [result] = await db.execute(sqlMaxNo)
    res.render('pac/hrm/positionAdd', {
      title: 'Position Creact',
      maxNo: result[0]['max'] + 1,
      user: req.session.user,
      updatedAt: moment(new Date()).format('DD/MM/YYYY HH:mm:ss')
    });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get create position invalid.' })
  }
}

exports.postAddPosition = async (req, res) => {
  try {
    const { positionNo, positionNameTH, positionNameEN } = req.body;
    const sqlInsert = "INSERT INTO `position`(`id`, `no`, `nameTH`, `nameEN`, `updatedAt`) VALUES (UUID(),?,?,?,?)"
    const sqlGetAll = "SELECT `id`, `no`, `nameTH`, `nameEN`, DATE_FORMAT(`createdAt`, '%d/%m/%Y %H:%i:%s') as `createdAt`,DATE_FORMAT(`updatedAt`, '%d/%m/%Y %H:%i:%s') as `updatedAt` FROM `position` ";
    const timestamp = moment(new Date()).format()
    await db.execute(sqlInsert,
      [ positionNo, positionNameTH, positionNameEN, timestamp]);
    const [results] = await db.execute(sqlGetAll);
      res.render('pac/hrm/position', {
        title: 'Position Management',
        results: results,
        user: req.session.user,
        resultsJson: JSON.stringify(results)
      });
  } catch (err) {
    console.error('Error post data :', err)
    res.status(500).json({ error: 'Post create position invalid.' })
  }
}

exports.getEditPosition= async (req, res) => {
  try {
    const sqlSelectOne = "SELECT `id`, `no`, `nameTH`, `nameEN`, `createdAt`, `updatedAt` FROM `position` WHERE `id` = ?"
    const [result] = await db.execute(sqlSelectOne, [req.params.id]);
        const coverDate = {
          createdAt: result[0].createdAt ? moment(result[0].createdAt).format('DD/MM/YYYY HH:mm:ss') : undefined,
          updatedAt: result[0].updatedAt ? moment(result[0].updatedAt).format('DD/MM/YYYY HH:mm:ss') : undefined,
          timestamp: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
        }
        res.render('pac/hrm/positionEdit', {
          title: 'Position Edit',
          result: result[0],
          user: req.session.user,
          coverDate: coverDate
        });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get update position invalid.' })
  }
}

exports.postEditPosition = async (req, res) => {
  try {
    const { positionNoE, positionNameTHE, positionNameENE } = req.body;
    const sqlGetAll = "SELECT `id`, `no`, `nameTH`, `nameEN`, DATE_FORMAT(`createdAt`, '%d/%m/%Y %H:%i:%s') as `createdAt`,DATE_FORMAT(`updatedAt`, '%d/%m/%Y %H:%i:%s') as `updatedAt` FROM `position` ";
    const sqlUpdate = "UPDATE `position` SET `no`=?,`nameTH`=?,`nameEN`=?,`updatedAt`=? WHERE `id` = ?"
    const timestamp = moment(new Date()).format()
    await db.execute(sqlUpdate,
      [positionNoE, positionNameTHE, positionNameENE, timestamp , req.params.id] );
    const [results] = await db.execute(sqlGetAll);
      res.render('pac/hrm/position', {
        title: 'Position Management',
        results: results,
        user: req.session.user,
        resultsJson: JSON.stringify(results)
      });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get update position invalid.' })
  }
}

exports.getDelPosition = async (req, res) => {
  try {
    const sqlDelete = "DELETE FROM `position` WHERE `id` = ?"
    await db.execute(sqlDelete, [req.params.id] );
    const sqlGetAll = "SELECT `id`, `no`, `nameTH`, `nameEN`, DATE_FORMAT(`createdAt`, '%d/%m/%Y %H:%i:%s') as `createdAt`,DATE_FORMAT(`updatedAt`, '%d/%m/%Y %H:%i:%s') as `updatedAt` FROM `position` ";
    const [results] = await db.execute(sqlGetAll);
      res.render('pac/hrm/position', {
        title: 'Position Management',
        results: results,
        user: req.session.user,
        resultsJson: JSON.stringify(results)
      });
  } catch (err) {
    console.error('Error get remove data :', err)
    res.status(500).json({ error: 'Get remove position invalid.' })
  }
}
// 2. สร้าง Router instance
const db = require('../../../../db/db');
const moment = require('moment');

exports.getAllEducationlevel = async (req, res) => {
  try {
    const sqlGetAll = "SELECT `id`, `no`, `nameTH`, `nameEN`, DATE_FORMAT(`createdAt`, '%d/%m/%Y %H:%i:%s') as `createdAt`,DATE_FORMAT(`updatedAt`, '%d/%m/%Y %H:%i:%s') as `updatedAt` FROM `educationlevel` ";
    const [results] = await db.execute(sqlGetAll);
      res.render('pac/hrm/educationlevel', {
        title: 'Education Level Management',
        results: results,
        resultsJson: JSON.stringify(results)
      });
  } catch (err) {
    console.error('Error list data :', err)
    res.status(500).json({ error: 'List educationlevel invalid.' })
  }
}

exports.getAddEducationlevel = async (req, res) => {
  try {
    const sqlMaxNo = "SELECT IFNULL(MAX(`no`), 0) as `max`  FROM `educationlevel`";
    const [result] = await db.execute(sqlMaxNo)
    res.render('pac/hrm/educationlevelAdd', {
      title: 'Education Level Creact',
      maxNo: result[0]['max'] + 1,
      updatedAt: moment(new Date()).format('DD/MM/YYYY HH:mm:ss')
    });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get create educationlevel invalid.' })
  }
}

exports.postAddEducationlevel = async (req, res) => {
  try {
    const { educationlevelNo, educationlevelNameTH, educationlevelNameEN } = req.body;
    const sqlInsert = "INSERT INTO `educationlevel`(`id`, `no`, `nameTH`, `nameEN`, `updatedAt`) VALUES (UUID(),?,?,?,?)"
    const sqlGetAll = "SELECT `id`, `no`, `nameTH`, `nameEN`, DATE_FORMAT(`createdAt`, '%d/%m/%Y %H:%i:%s') as `createdAt`,DATE_FORMAT(`updatedAt`, '%d/%m/%Y %H:%i:%s') as `updatedAt` FROM `educationlevel` ";
    const timestamp = moment(new Date()).format()
    await db.execute(sqlInsert,
      [ educationlevelNo, educationlevelNameTH, educationlevelNameEN, timestamp]);
    const [results] = await db.execute(sqlGetAll);
      res.render('pac/hrm/educationlevel', {
        title: 'Education Level Management',
        results: results,
        resultsJson: JSON.stringify(results)
      });
  } catch (err) {
    console.error('Error post data :', err)
    res.status(500).json({ error: 'Post create educationlevel invalid.' })
  }
}

exports.getEditEducationlevel= async (req, res) => {
  try {
    const sqlSelectOne = "SELECT `id`, `no`, `nameTH`, `nameEN`, `createdAt`, `updatedAt` FROM `educationlevel` WHERE `id` = ?"
    const [result] = await db.execute(sqlSelectOne, [req.params.id]);
        const coverDate = {
          createdAt: result[0].createdAt ? moment(result[0].createdAt).format('DD/MM/YYYY HH:mm:ss') : undefined,
          updatedAt: result[0].updatedAt ? moment(result[0].updatedAt).format('DD/MM/YYYY HH:mm:ss') : undefined,
          timestamp: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
        }
        res.render('pac/hrm/educationlevelEdit', {
          title: 'Education Level Edit',
          result: result[0],
          coverDate: coverDate
        });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get update educationlevel invalid.' })
  }
}

exports.postEditEducationlevel = async (req, res) => {
  try {
    const { educationlevelNoE, educationlevelNameTHE, educationlevelNameENE } = req.body;
    const sqlGetAll = "SELECT `id`, `no`, `nameTH`, `nameEN`, DATE_FORMAT(`createdAt`, '%d/%m/%Y %H:%i:%s') as `createdAt`,DATE_FORMAT(`updatedAt`, '%d/%m/%Y %H:%i:%s') as `updatedAt` FROM `educationlevel` ";
    const sqlUpdate = "UPDATE `educationlevel` SET `no`=?,`nameTH`=?,`nameEN`=?,`updatedAt`=? WHERE `id` = ?"
    const timestamp = moment(new Date()).format()
    await db.execute(sqlUpdate,
      [educationlevelNoE, educationlevelNameTHE, educationlevelNameENE, timestamp , req.params.id] );
    const [results] = await db.execute(sqlGetAll);
      res.render('pac/hrm/educationlevel', {
        title: 'Education Level Management',
        results: results,
        resultsJson: JSON.stringify(results)
      });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get update educationlevel invalid.' })
  }
}

exports.getDelEducationlevel = async (req, res) => {
  try {
    const sqlDelete = "DELETE FROM `educationlevel` WHERE `id` = ?"
    await db.execute(sqlDelete, [req.params.id] );
    const sqlGetAll = "SELECT `id`, `no`, `nameTH`, `nameEN`, DATE_FORMAT(`createdAt`, '%d/%m/%Y %H:%i:%s') as `createdAt`,DATE_FORMAT(`updatedAt`, '%d/%m/%Y %H:%i:%s') as `updatedAt` FROM `educationlevel` ";
    const [results] = await db.execute(sqlGetAll);
      res.render('pac/hrm/educationlevel', {
        title: 'Education Level Management',
        results: results,
        resultsJson: JSON.stringify(results)
      });
  } catch (err) {
    console.error('Error get remove data :', err)
    res.status(500).json({ error: 'Get remove educationlevel invalid.' })
  }
}
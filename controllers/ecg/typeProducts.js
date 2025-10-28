// 2. สร้าง Router instance
const db = require('../../db/db');
const moment = require('moment');

exports.getAllTypeProducts = async (req, res) => {
  try {
    const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `createdAt`, `updatedAt` FROM `eCatalogTypeProducts`";
    const [results] = await db.execute(sqlGetAll)
    res.render('ecatalog/admin/typeProducts', {
      title: 'Type Products Management',
      results: results,
      resultsJson: JSON.stringify(results)
    });
  } catch (err) {
    console.error('Error list data :', err)
    res.status(500).json({ error: 'List type products invalid.' })
  }
}

exports.getAddTypeProducts = async (req, res) => {
  try {
    const sqlMaxNo = "SELECT IFNULL(MAX(`no`), 0) as `max`  FROM `eCatalogTypeProducts`";
    const [result] = await db.execute(sqlMaxNo);
    res.render('ecatalog/admin/typeProductsAdd', {
      title: 'Type Products Creact',
      maxNo: result[0]['max'] + 1,
      updatedAt: moment(new Date()).format('DD/MM/YYYY HH:mm:ss')
    });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get create type products invalid.' })
  }
}

exports.postAddTypeProducts = async (req, res) => {
  try {
    const { no, code, nameTH, nameEN, shortKeyword, keyword, img, createdAt } = req.body;
    const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `createdAt`, `updatedAt` FROM `eCatalogTypeProducts`";
    const image = req.file ? req.file.filename : null;
    const timestamp = moment(new Date()).format();
    const sqlInsert = "INSERT INTO `eCatalogTypeProducts`(`id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `updatedAt`) VALUES (UUID(),?,?,?,?,?,?,?,?)"
    const sqlInsert_NoPic = "INSERT INTO `eCatalogTypeProducts`(`id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `updatedAt`) VALUES (UUID(),?,?,?,?,?,?,?)"
    if (image) {
      await db.execute(sqlInsert,
        [no, code, nameTH, nameEN, shortKeyword, keyword, image, timestamp]);
      const [results] = await db.execute(sqlGetAll)
      res.render('ecatalog/admin/typeProducts', {
        title: 'Type Products Management',
        results: results,
        resultsJson: JSON.stringify(results)
      });
    } else {
      await db.execute(sqlInsert_NoPic,
        [no, code, nameTH, nameEN, shortKeyword, keyword, timestamp]);

      const [results] = await db.execute(sqlGetAll)
      res.render('ecatalog/admin/typeProducts', {
        title: 'Type Products Management',
        results: results,
        resultsJson: JSON.stringify(results)
      });
    }
  } catch (err) {
    console.error('Error post data :', err)
    res.status(500).json({ error: 'Post create type products invalid.' })
  }
}

exports.getEditTypeProducts = async (req, res) => {
  try {
    const sqlSelectOne = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `createdAt`, `updatedAt` FROM `eCatalogTypeProducts` WHERE `id` = ?"
    const [result] = await db.execute(sqlSelectOne, [req.params.id]);
    const coverDate = {
      createdAt: result[0].createdAt ? moment(result[0].createdAt).format('DD/MM/YYYY HH:mm:ss') : undefined,
      updatedAt: result[0].updatedAt ? moment(result[0].updatedAt).format('DD/MM/YYYY HH:mm:ss') : undefined,
      timestamp: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
    }
    res.render('ecatalog/admin/typeProductsEdit', {
      title: 'Type Products Edit',
      result: result[0],
      coverDate: coverDate
    });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get update type products invalid.' })
  }
}

exports.postEditTypeProducts = async (req, res) => {
  try {
    const { noE, codeE, nameTHE, nameENE, shortKeywordE, keywordE, img, createdAtE } = req.body;
    const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `createdAt`, `updatedAt` FROM `eCatalogTypeProducts`";
    const sqlUpdate = "UPDATE `eCatalogTypeProducts` SET `id`=?,`no`=?,`code`=?,`nameTH`=?,`nameEN`=?,`shortKeyword`=?,`keyword`=?,`img`=?,`updatedAt`=? WHERE `id` = ?"
    const sqlUpdateNoImg = "UPDATE `eCatalogTypeProducts` SET `id`=?,`no`=?,`code`=?,`nameTH`=?,`nameEN`=?,`shortKeyword`=?,`keyword`=?,`updatedAt`=? WHERE `id` = ?"
    const image = req.file ? req.file.filename : null;
    const timestamp = moment(new Date()).format();
    if (image) {
      await db.execute(sqlUpdate,
        [noE, codeE, nameTHE, nameENE, shortKeywordE, keywordE, image, timestamp, req.params.id]
      );
      const [results] = await db.execute(sqlGetAll)
      res.render('ecatalog/admin/typeProducts', {
        title: 'Type Products Management',
        results: results,
        resultsJson: JSON.stringify(results)
      });
    } else {
      await db.execute(sqlUpdateNoImg,
        [noE, codeE, nameTHE, nameENE, shortKeywordE, keywordE, timestamp, req.params.id]
      );
      const [results] = await db.execute(sqlGetAll)
      res.render('ecatalog/admin/typeProducts', {
        title: 'Type Products Management',
        results: results,
        resultsJson: JSON.stringify(results)
      });
    }
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get update type products invalid.' })
  }
}

exports.getDelTypeProducts = async (req, res) => {
  try {
    const sqlDelete = "DELETE FROM `eCatalogTypeProducts` WHERE `id` = ?"
    await db.execute(sqlDelete, [req.params.id]);
    const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `createdAt`, `updatedAt` FROM `eCatalogTypeProducts`";
    const [results] = await db.execute(sqlGetAll)
    res.render('ecatalog/admin/typeProducts', {
      title: 'Type Products Management',
      results: results,
      resultsJson: JSON.stringify(results)
    });
  } catch (err) {
    console.error('Error get remove data :', err)
    res.status(500).json({ error: 'Get remove type products invalid.' })
  }
}
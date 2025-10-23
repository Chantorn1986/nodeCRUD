// 1. นำเข้า Express
const express = require('express');

// 2. สร้าง Router instance
const router = express.Router();
// router.use(express.urlencoded({ extended: true }));
const db = require("../../db/db");
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');
const { uploadBrands } = require('../../middlewares/callFunction');

router.get('/', (req, res) => {
  res.render('ecatalog/admin/index', { title: 'Index Admin' });
});

router.get('/brands', (req, res) => {
  try {
    const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`";
    db.query(sqlGetAll, (err, results) => {
      if (err) throw err;
      // res.render('ecatalog/admin/brands', {
      //   title: 'Brands Management',
      //   brands: results,
      //   brandJson: JSON.stringify(results)
      // });
            const data = [
        {
        title: 'Brands Management',
        brands: results,
        // brandJson: JSON.stringify(results)
        }
      ]
      res.json(data)
    });
  } catch (err) {
    console.error('Error list data :', err)
    res.status(500).json({ error: 'List departments invalid.' })
  }
});

router.get('/brands/Add', (req, res) => {
  try {
    const sqlMaxNo = "SELECT IFNULL(MAX(`no`), 0) as `max`  FROM `eCatalogBrands`";
    db.query(sqlMaxNo, (err, result) => {
      if (err) throw err;
      // res.render('ecatalog/admin/brandsAdd', {
      //   title: 'Brands Management',
      //   maxNo: result[0]['max'] + 1,
      //   updatedAt: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
      //   year: moment(new Date()).format('YYYY')
      // });
      const data = [
        {
          title: 'Brands Management',
          maxNo: result[0]['max'] + 1,
          updatedAt: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
          year: moment(new Date()).format('YYYY')
        }
      ];
      res.json(data)
    });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get create brands invalid.' })
  }
});

router.post('/brands/Add', uploadBrands, (req, res) => {
  try {
    const { brandsNo, brandsCode, brandsNameTH, brandsNameEN, shortKeyword, keyword, linkMain, brandsYear, brandsCreatedAt, brandsUpdatedAt } = req.body;
    const image = req.file ? req.file.filename : null;
    const sqlInsert = "INSERT INTO `eCatalogBrands`(`id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `updatedAt`) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
    const sqlInsert_NoPic = "INSERT INTO `eCatalogBrands`(`id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `year`, `linkMain`, `updatedAt`) VALUES (?,?,?,?,?,?,?,?,?,?)"
    const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`";
    if (image) {
      db.query(sqlInsert,
        [uuidv4(), brandsNo, brandsCode, brandsNameTH, brandsNameEN, shortKeyword, keyword, image, brandsYear, linkMain, brandsUpdatedAt]
        , (err, resultAdd) => {
          if (err) throw err;
          db.query(sqlGetAll, (err, results) => {
            if (err) throw err;
            res.render('ecatalog/admin/brands', {
              title: 'Brands Management',
              brands: results,
              brandJson: JSON.stringify(results)
            });
          });
        });
    } else {
      db.query(sqlInsert_NoPic,
        [uuidv4(), brandsNo, brandsCode, brandsNameTH, brandsNameEN, shortKeyword, keyword, brandsYear, linkMain, brandsUpdatedAt]
        , (err, resultAdd) => {
          if (err) throw err;
          db.query(sqlGetAll, (err, results) => {
            if (err) throw err;
            res.render('ecatalog/admin/brands', {
              title: 'Brands Management',
              brands: results,
              brandJson: JSON.stringify(results)
            });
          });
        });
    }
  } catch (err) {
    console.error('Error post data :', err)
    res.status(500).json({ error: 'Post create brands invalid.' })
  }
});

router.get('/brands/Edit/:id', (req, res) => {
  try {
    const sqlSelectOne = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands` WHERE `id` = ?"
    db.query(sqlSelectOne, [req.params.id],
      (err, result) => {
        if (err) throw err;
        const coverDate = {
          createdAt: result[0].createdAt ? moment(result[0].createdAt).format('DD/MM/YYYY HH:mm:ss') : undefined,
          updatedAt: result[0].updatedAt ? moment(result[0].updatedAt).format('DD/MM/YYYY HH:mm:ss') : undefined,
          timestamp: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
        }
        res.render('ecatalog/admin/brandsEdit', {
          title: 'Brands Edit',
          brands: result[0],
          coverDate: coverDate
        });
      });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get update brands invalid.' })
  }
});

router.post('/brands/Edit/:id', uploadBrands, (req, res) => {
  try {
    const { brandsNoE, brandsCodeE, brandsNameTHE, brandsNameENE, shortKeywordE, keywordE, linkMainE, brandsYearE, brandsCreatedAtE, brandsUpdatedAtE } = req.body;
    const sqlUpdate = "UPDATE `eCatalogBrands` SET `no`=?,`code`=?,`nameTH`=?,`nameEN`=?,`shortKeyword`=?,`keyword`=?,`img`=?,`year`=?,`linkMain`=?,`updatedAt`=? WHERE `id` = ?"
    const sqlUpdateNoImg = "UPDATE `eCatalogBrands` SET `no`=?,`code`=?,`nameTH`=?,`nameEN`=?,`shortKeyword`=?,`keyword`=?,`year`=?,`linkMain`=?,`updatedAt`=? WHERE `id` = ?"
    const image = req.file ? req.file.filename : null;
    if (image) {
      db.query(sqlUpdate,
        [brandsNoE, brandsCodeE, brandsNameTHE, brandsNameENE, shortKeywordE, keywordE, image, brandsYearE, linkMainE, brandsUpdatedAtE, req.params.id]
        , (err, resultUpdate) => {
          if (err) throw err;
          const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`";
          db.query(sqlGetAll, (err, results) => {
            if (err) throw err;
            res.render('ecatalog/admin/brands', {
              title: 'Brands Management',
              brands: results,
              brandJson: JSON.stringify(results)
            });
          });
        });
    } else {
      db.query(sqlUpdateNoImg,
        [brandsNoE, brandsCodeE, brandsNameTHE, brandsNameENE, shortKeywordE, keywordE, brandsYearE, linkMainE, brandsUpdatedAtE, req.params.id]
        , (err, resultUpdate) => {
          if (err) throw err;
          const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`";
          db.query(sqlGetAll, (err, results) => {
            if (err) throw err;
            res.render('ecatalog/admin/brands', {
              title: 'Brands Management',
              brands: results,
              brandJson: JSON.stringify(results)
            });
          });
        });
    }
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get update brands invalid.' })
  }
});

router.get('/brands/Del/:id', (req, res) => {
  try {
    const sqlDelete = "DELETE FROM `eCatalogBrands` WHERE `id` = ?"
    db.query(sqlDelete,
      [req.params.id]
      , (err, resultDel) => {
        if (err) throw err;
        const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`";
        db.query(sqlGetAll, (err, results) => {
          if (err) throw err;
          res.render('ecatalog/admin/brands', {
            title: 'Brands Management',
            brands: results,
            brandJson: JSON.stringify(results)
          });
        });
      });
  } catch (err) {
    console.error('Error get remove data :', err)
    res.status(500).json({ error: 'Get remove brands invalid.' })
  }
});
// 4. ส่งออก Router
module.exports = router;
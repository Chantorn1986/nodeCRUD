// 1. นำเข้า Express
const express = require('express');
// 2. สร้าง Router instance
const router = express.Router();
router.use(express.json());
const path = require('path');
const db = require('../db/db');
const multer = require('multer');
const moment = require('moment');
const { uploadBrands,nano36 } = require('../middlewares/callFunction');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({ storage });

// 3. กำหนดเส้นทาง (Routes)

router.get('/', (req, res) => {
  res.render('ecatalog/user/index', { title: 'E-Catalog' });
});

router.get('/admin', (req, res) => {
  res.render('ecatalog/admin/index', { title: 'E-Catalog Admin' });
});

router.get('/brands',async (req, res) => {
  try {
    const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`";
    await db.execute(sqlGetAll, (err, results) => {
      if (err) throw err;
      res.render('ecatalog/admin/brands', {
        title: 'Brands Management',
        brands: results,
        brandJson: JSON.stringify(results)
      });
    });
  } catch (err) {
    console.error('Error list data :', err)
    res.status(500).json({ error: 'List departments invalid.' })
  }
});

router.get('/brands/Add',async (req, res) => {
  try {
    const sqlMaxNo = "SELECT IFNULL(MAX(`no`), 0) as `max`  FROM `eCatalogBrands`";
    await db.execute(sqlMaxNo, (err, result) => {
      if (err) throw err;
      res.render('ecatalog/admin/brandsAdd', {
        title: 'Brands Management',
        maxNo: result[0]['max'] + 1,
        updatedAt: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
        year: moment(new Date()).format('YYYY')
      });
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

router.post('/brands/Add', uploadBrands, async (req, res) => {
  try {
    const { brandsNo, brandsCode, brandsNameTH, brandsNameEN, shortKeyword, keyword, linkMain, brandsYear, brandsCreatedAt, brandsUpdatedAt } = req.body;
    const image = req.file ? req.file.filename : null;
    const sqlInsert = "INSERT INTO `eCatalogBrands`(`id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `updatedAt`) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
    const sqlInsert_NoPic = "INSERT INTO `eCatalogBrands`(`id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `year`, `linkMain`, `updatedAt`) VALUES (?,?,?,?,?,?,?,?,?,?)"
    const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`";
    if (image) {
      await db.execute(sqlInsert,
        [nano36, brandsNo, brandsCode, brandsNameTH, brandsNameEN, shortKeyword, keyword, image, brandsYear, linkMain, brandsUpdatedAt]
        , (err, resultAdd) => {
          if (err) throw err;
          return ;
        });
      await db.execute(sqlGetAll, (err, results) => {
            if (err) throw err;
            res.render('ecatalog/admin/brands', {
              title: 'Brands Management',
              brands: results,
              brandJson: JSON.stringify(results)
            });
          });
    } else {
      await db.execute(sqlInsert_NoPic,
        [nano36, brandsNo, brandsCode, brandsNameTH, brandsNameEN, shortKeyword, keyword, brandsYear, linkMain, brandsUpdatedAt]
        , (err, resultAdd) => {
          if (err) throw err;
          return ;
        });
      await db.execute(sqlGetAll, (err, results) => {
        if (err) throw err;
            res.render('ecatalog/admin/brands', {
              title: 'Brands Management',
              brands: results,
              brandJson: JSON.stringify(results)
            });
          });
    }
  } catch (err) {
    console.error('Error post data :', err)
    res.status(500).json({ error: 'Post create brands invalid.' })
  }
});

router.get('/brands/Edit/:id', async (req, res) => {
  try {
    const sqlSelectOne = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands` WHERE `id` = ?"
    await db.execute(sqlSelectOne, [req.params.id],
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

router.post('/brands/Edit/:id', uploadBrands, async (req, res) => {
  try {
    const { brandsNoE, brandsCodeE, brandsNameTHE, brandsNameENE, shortKeywordE, keywordE, linkMainE, brandsYearE, brandsCreatedAtE, brandsUpdatedAtE } = req.body;
    const sqlUpdate = "UPDATE `eCatalogBrands` SET `no`=?,`code`=?,`nameTH`=?,`nameEN`=?,`shortKeyword`=?,`keyword`=?,`img`=?,`year`=?,`linkMain`=?,`updatedAt`=? WHERE `id` = ?"
    const sqlUpdateNoImg = "UPDATE `eCatalogBrands` SET `no`=?,`code`=?,`nameTH`=?,`nameEN`=?,`shortKeyword`=?,`keyword`=?,`year`=?,`linkMain`=?,`updatedAt`=? WHERE `id` = ?"
    const image = req.file ? req.file.filename : null;
    if (image) {
      await db.execute(sqlUpdate,
        [brandsNoE, brandsCodeE, brandsNameTHE, brandsNameENE, shortKeywordE, keywordE, image, brandsYearE, linkMainE, brandsUpdatedAtE, req.params.id]
        , (err, resultUpdate) => {
          if (err) throw err;
          return ;
        });
      const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`";
      await db.execute(sqlGetAll, (err, results) => {
            if (err) throw err;
            res.render('ecatalog/admin/brands', {
              title: 'Brands Management',
              brands: results,
              brandJson: JSON.stringify(results)
            });
          });
    } else {
      await db.execute(sqlUpdateNoImg,
        [brandsNoE, brandsCodeE, brandsNameTHE, brandsNameENE, shortKeywordE, keywordE, brandsYearE, linkMainE, brandsUpdatedAtE, req.params.id]
        , (err, resultUpdate) => {
          if (err) throw err;
          return ;
        });
      const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`";
      await db.execute(sqlGetAll, (err, results) => {
            if (err) throw err;
            res.render('ecatalog/admin/brands', {
              title: 'Brands Management',
              brands: results,
              brandJson: JSON.stringify(results)
            });
          });
    }
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get update brands invalid.' })
  }
});


router.get('/brands/Del/:id',async (req, res) => {
  try {
    const sqlDelete = "DELETE FROM `eCatalogBrands` WHERE `id` = ?"
    await db.execute(sqlDelete,
      [req.params.id]
      , (err, resultDel) => {
        if (err) throw err;
        return;
      });
    const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`";
    await db.execute(sqlGetAll, (err, results) => {
          if (err) throw err;
          res.render('ecatalog/admin/brands', {
            title: 'Brands Management',
            brands: results,
            brandJson: JSON.stringify(results)
          });
        });
  } catch (err) {
    console.error('Error get remove data :', err)
    res.status(500).json({ error: 'Get remove brands invalid.' })
  }
});
// 3. กำหนดเส้นทาง (Routes)
router.get('/test', (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, results) => {
    if (err) throw err;

    res.render('home', {
      title: 'Home',
      products: results
    });
  })
});

router.post('/create', upload.single('image'), (req, res) => {
  const { name, description } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = "INSERT INTO products (name, description, image) VALUES(?, ?, ?)";
  db.query(sql, [name, description, image], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  })
})

router.get('/edit/:id', (req, res) => {
  const sql = "SELECT * FROM products WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.render('edit', { product: result[0] });
  });
})

router.post('/edit/:id', upload.single('image'), (req, res) => {
  const { name, description } = req.body;
  const image = req.file ? req.file.filename : req.body.oldImage;

  const sql = "UPDATE products SET name = ?, description = ?, image = ? WHERE id = ?";
  db.query(sql, [name, description, image, req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  })
})

router.get('/delete/:id', (req, res) => {
  const sql = "DELETE FROM products WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
})

router.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

router.get('/create', (req, res) => {
  res.render('create');
})

router.get('/data', (req, res) => {
  res.send('Hello from Router Data!');
});

router.post('/data', (req, res) => {
  res.json({ message: 'Data received' });
});

// 4. ส่งออก Router
module.exports = router;
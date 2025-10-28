// 2. สร้าง Router instance
const db = require('../../db/db');
const moment = require('moment');

// let brands = []
//           let brand = req.body;
//           brands.push(brand)
//           let selectedIndex = brands.findIndex(brand => brand.id == id)
// const userToUpdate = users.find((user) => user.id === parseInt(id))

exports.getAllBrands = async (req, res) => {
  try {
    const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`";
    const [results] = await db.execute(sqlGetAll)
    res.render('ecatalog/admin/brands', {
      title: 'Brands Management',
      brands: results,
      brandJson: JSON.stringify(results)
    });
  } catch (err) {
    console.error('Error list data :', err)
    res.status(500).json({ error: 'List brands invalid.' })
  }
}

exports.getAddBrands = async (req, res) => {
  try {
    const sqlMaxNo = "SELECT IFNULL(MAX(`no`), 0) as `max`  FROM `eCatalogBrands`";
    const [result] = await db.execute(sqlMaxNo)
    res.render('ecatalog/admin/brandsAdd', {
      title: 'Brands Creact',
      maxNo: result[0]['max'] + 1,
      updatedAt: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
      year: moment(new Date()).format('YYYY')
    });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get create brands invalid.' })
  }
}

exports.postAddBrands = async (req, res) => {
  try {
    const { brandsNo, brandsCode, brandsNameTH, brandsNameEN, shortKeyword, keyword, linkMain, brandsYear, brandsCreatedAt, brandsUpdatedAt } = req.body;
    const image = req.file ? req.file.filename : null;
    const timestamp = moment(new Date()).format();
    const sqlInsert = "INSERT INTO `eCatalogBrands`(`id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `updatedAt`) VALUES (UUID(),?,?,?,?,?,?,?,?,?,?)"
    const sqlInsert_NoPic = "INSERT INTO `eCatalogBrands`(`id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `year`, `linkMain`, `updatedAt`) VALUES (UUID(),?,?,?,?,?,?,?,?,?)"
    const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`";
    if (image) {
      await db.execute(
        sqlInsert,
        [brandsNo, brandsCode, brandsNameTH, brandsNameEN, shortKeyword, keyword, image, brandsYear, linkMain, timestamp]
      );
      const [results] = await db.execute(sqlGetAll)
      res.render('ecatalog/admin/brands', {
        title: 'Brands Management',
        brands: results,
        brandJson: JSON.stringify(results)
      });
    } else {
      await db.execute(
        sqlInsert_NoPic,
        [brandsNo, brandsCode, brandsNameTH, brandsNameEN, shortKeyword, keyword, brandsYear, linkMain, timestamp]
      );
      const [results] = await db.execute(sqlGetAll)
      res.render('ecatalog/admin/brands', {
        title: 'Brands Management',
        brands: results,
        brandJson: JSON.stringify(results)
      });
    }
  } catch (err) {
    console.error('Error post data :', err)
    res.status(500).json({ error: 'Post create brands invalid.' })
  }
}

exports.getEditBrands = async (req, res) => {
  try {
    const sqlSelectOne = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands` WHERE `id` = ?"
    const [result] = await db.execute(sqlSelectOne, [req.params.id])
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
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get update brands invalid.' })
  }
}

exports.postEditBrands = async (req, res) => {
  try {
    const { brandsNoE, brandsCodeE, brandsNameTHE, brandsNameENE, shortKeywordE, keywordE, linkMainE, brandsYearE, brandsCreatedAtE, brandsUpdatedAtE } = req.body;
    const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`";
    const sqlUpdate = "UPDATE `eCatalogBrands` SET `no`=?,`code`=?,`nameTH`=?,`nameEN`=?,`shortKeyword`=?,`keyword`=?,`img`=?,`year`=?,`linkMain`=?,`updatedAt`=? WHERE `id` = ?"
    const sqlUpdateNoImg = "UPDATE `eCatalogBrands` SET `no`=?,`code`=?,`nameTH`=?,`nameEN`=?,`shortKeyword`=?,`keyword`=?,`year`=?,`linkMain`=?,`updatedAt`=? WHERE `id` = ?"
    const image = req.file ? req.file.filename : null;
    const timestamp = moment(new Date()).format();
    if (image) {
      await db.execute(
        sqlUpdate,
        [brandsNoE, brandsCodeE, brandsNameTHE, brandsNameENE, shortKeywordE, keywordE, image, brandsYearE, linkMainE, timestamp, req.params.id]
      );
      const [results] = await db.execute(sqlGetAll)
      res.render('ecatalog/admin/brands', {
        title: 'Brands Management',
        brands: results,
        brandJson: JSON.stringify(results)
      });
    } else {
      await db.execute(
        sqlUpdateNoImg,
        [brandsNoE, brandsCodeE, brandsNameTHE, brandsNameENE, shortKeywordE, keywordE, brandsYearE, linkMainE, timestamp, req.params.id]
      );
      const [results] = await db.execute(sqlGetAll)
      res.render('ecatalog/admin/brands', {
        title: 'Brands Management',
        brands: results,
        brandJson: JSON.stringify(results)
      });
    }
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get update brands invalid.' })
  }
}

exports.getDelBrands = async (req, res) => {
  try {
    const sqlDelete = "DELETE FROM `eCatalogBrands` WHERE `id` = ?"
    await db.execute(sqlDelete, [req.params.id]);
    const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`";
    const [results] = await db.execute(sqlGetAll)
    res.render('ecatalog/admin/brands', {
      title: 'Brands Management',
      brands: results,
      brandJson: JSON.stringify(results)
    });
  } catch (err) {
    console.error('Error get remove data :', err)
    res.status(500).json({ error: 'Get remove brands invalid.' })
  }
}
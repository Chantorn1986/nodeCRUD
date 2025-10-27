const db = require('../db/db');

exports.adminBrands = (req, res) => {
  const sqlGetAll = "SELECT `id`, `no`, `code`, `nameTH`, `nameEN`, `shortKeyword`, `keyword`, `img`, `year`, `linkMain`, `createdAt`, `updatedAt` FROM `eCatalogBrands`";
  db.query(sqlGetAll, (err, results) => {
    if (err) throw err;
    res.render('ecatalog/admin/brands', {
      title: 'Brands Management',
      brands: results,
      brandJson: JSON.stringify(results)
    });
  })
}

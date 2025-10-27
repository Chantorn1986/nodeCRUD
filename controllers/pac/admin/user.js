// 2. สร้าง Router instance
const db = require('../../../db/db');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.getAllUser = async (req, res) => {
  try {
    const sqlGetAll = "SELECT `id`, `name`, `email`, `password`, `role`, DATE_FORMAT(`createdAt`, '%d/%m/%Y %H:%i:%s') as `createdAt`,DATE_FORMAT(`updatedAt`, '%d/%m/%Y %H:%i:%s') as `updatedAt` FROM `user` ";
    await db.execute(sqlGetAll, (err, results) => {
      if (err) throw err;
      res.render('pac/admin/user', {
        title: 'User Management',
        results: results,
        resultsJson: JSON.stringify(results)
      });
    });
  } catch (err) {
    console.error('Error list data :', err)
    res.status(500).json({ error: 'List brands invalid.' })
  }
}

exports.getAddUser = async (req, res) => {
  try {
    res.render('pac/admin/userAdd', {
      title: 'User Creact',
      updatedAt: moment(new Date()).format('DD/MM/YYYY HH:mm:ss')
    });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get create user invalid.' })
  }
}

exports.postAddUser = async (req, res) => {
  try {
    const { userName, userEmail, userPassword, userRole, userUpdatedAt } = req.body;
    const sqlInsert = "INSERT INTO `user`(`id`, `name`, `email`, `password`, `role`, `updatedAt`) VALUES (UUID(),?,?,?,?,?)"
    const sqlGetAll = "SELECT `id`, `name`, `email`, `password`, `role`, DATE_FORMAT(`createdAt`, '%d/%m/%Y %H:%i:%s') as `createdAt`,DATE_FORMAT(`updatedAt`, '%d/%m/%Y %H:%i:%s') as `updatedAt` FROM `user` ";
    const hashPassword = await bcrypt.hashSync(userPassword, 10);
    const timestamp = moment(new Date()).format()
    await db.execute(sqlInsert,
      [ userName, userEmail, hashPassword, userRole, timestamp]
      , (err, resultAdd) => {
        if (err) throw err;
        return;
      });
    await db.execute(sqlGetAll, (err, results) => {
      if (err) throw err;
      res.render('pac/admin/user', {
        title: 'User Management',
        results: results,
        resultsJson: JSON.stringify(results)
      });
    });
  } catch (err) {
    console.error('Error post data :', err)
    res.status(500).json({ error: 'Post create user invalid.' })
  }
}

exports.getEditUser = async (req, res) => {
  try {
    const sqlSelectOne = "SELECT `id`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt` FROM `user` WHERE `id` = ?"
    await db.execute(sqlSelectOne, [req.params.id],
      (err, result) => {
        if (err) throw err;
        const coverDate = {
          createdAt: result[0].createdAt ? moment(result[0].createdAt).format('DD/MM/YYYY HH:mm:ss') : undefined,
          updatedAt: result[0].updatedAt ? moment(result[0].updatedAt).format('DD/MM/YYYY HH:mm:ss') : undefined,
          timestamp: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
        }
        res.render('pac/admin/userEdit', {
          title: 'User Edit',
          result: result[0],
          coverDate: coverDate
        });
      });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get update user invalid.' })
  }
}

exports.postEditUser = async (req, res) => {
  try {
    const { userNameE, userEmailE, userPasswordE, userRoleE } = req.body;
    const sqlUpdate = "UPDATE `user` SET `name`=?,`email`=?,`password`=?,`role`=?,`updatedAt`=? WHERE `id` = ?"
    const timestamp = moment(new Date()).format()
    if(userPasswordE){
      const hashPassword = await bcrypt.hashSync(userPasswordE, 10);
      await db.execute(sqlUpdate,
      [userNameE, userEmailE, hashPassword, userRoleE,timestamp , req.params.id]
      , (err, resultUpdate) => {
        if (err) throw err;
        return;
      });
    }else{
      const sqlUpdate_NoPW = "UPDATE `user` SET `name`=?,`email`=?,`role`=?,`updatedAt`=? WHERE `id` = ?"
    await db.execute(sqlUpdate_NoPW,
      [userNameE, userEmailE, userRoleE,timestamp , req.params.id]
      , (err, resultUpdate) => {
        if (err) throw err;
        return;
      });
    }

    const sqlGetAll = "SELECT `id`, `name`, `email`, `password`, `role`, DATE_FORMAT(`createdAt`, '%d/%m/%Y %H:%i:%s') as `createdAt`,DATE_FORMAT(`updatedAt`, '%d/%m/%Y %H:%i:%s') as `updatedAt` FROM `user` ";
    await db.execute(sqlGetAll, (err, results) => {
      if (err) throw err;
      res.render('pac/admin/user', {
        title: 'User Management',
        results: results,
        resultsJson: JSON.stringify(results)
      });
    });
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Get update user invalid.' })
  }
}

exports.getDelUser = async (req, res) => {
  try {
    const sqlDelete = "DELETE FROM `user` WHERE `id` = ?"
    await db.execute(sqlDelete,
      [req.params.id]
      , (err, resultDel) => {
        if (err) throw err;
        return;
      });
    const sqlGetAll = "SELECT `id`, `name`, `email`, `password`, `role`, DATE_FORMAT(`createdAt`, '%d/%m/%Y %H:%i:%s') as `createdAt`,DATE_FORMAT(`updatedAt`, '%d/%m/%Y %H:%i:%s') as `updatedAt` FROM `user` ";
    await db.execute(sqlGetAll, (err, results) => {
      if (err) throw err;
      res.render('pac/admin/user', {
        title: 'User Management',
        results: results,
        resultsJson: JSON.stringify(results)
      });
    });
  } catch (err) {
    console.error('Error get remove data :', err)
    res.status(500).json({ error: 'Get remove user invalid.' })
  }
}
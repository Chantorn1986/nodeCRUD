const db = require("../../db/db");
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');

exports.index = async (req, res) => {
  try {
    res.render('ecatalog/user/index', { title: 'Index Admin' })
  } catch (err) {
    console.error('Error list data :', err)
    res.status(500).json({ error: 'List departments invalid.' })
  }
}
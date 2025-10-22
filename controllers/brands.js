// สมมติว่านี่คือฟังก์ชันที่เราไปเรียกใช้จาก Product Model
const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');



const getAllBrands = async (req, res) => {
  try {
    res.render('ecatalog/admin/index', {
      title: 'Admin Catalog'
    })
  } catch (err) {
    console.error('Error list data :', err)
    res.status(500).json({ error: 'List departments invalid.' })
  }
};
// 1. ฟังก์ชันสำหรับดึงสินค้าทั้งหมด
const getAllProducts = async (req, res) => {
  try {
    // 2. เรียกใช้ Logic/Model เพื่อทำงาน
    // const products = await Product.findAll();

    // 3. ส่งผลลัพธ์กลับไป (Success 200 OK)
    res.status(200).json({ 
      success: true
      // data: products 
    });
  } catch (error) {
    // จัดการข้อผิดพลาด
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to retrieve products.' 
    });
  }
};

// 2. ฟังก์ชันสำหรับสร้างสินค้าใหม่
const createNewProduct = async (req, res) => {
  try {
    // 1. รับข้อมูลจาก Request Body
    const newProductData = req.body; 

    // 2. เรียกใช้ Logic/Model เพื่อทำงาน
    // const product = await Product.create(newProductData);

    // 3. ส่งผลลัพธ์กลับไป (Success 201 Created)
    res.status(201).json({ 
      success: true,
      message: 'Product created successfully'
      // data: product 
    });
  } catch (error) {
    // จัดการข้อผิดพลาด
    console.error(error);
    res.status(400).json({ 
      success: false,
      message: 'Invalid data provided.' // หรือข้อความเฉพาะเจาะจง
    });
  }
};

// ส่งออก Controller เพื่อให้ Router นำไปใช้
module.exports = {
  getAllBrands
  // ... ฟังก์ชันอื่น ๆ เช่น updateProduct, deleteProduct
};
const multer  = require('multer')

const nano36 = () =>{
  const id = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
  const id36 = id.substring(0, 36);
  return id36;
}


const storageBrands = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/brands')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const storageTypeProducts = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/typeProducts')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const storageProducts = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/products')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const storageEmployee = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/employee')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const storageEmployeeCard = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/employeeCard')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

exports.nano36 = nano36()
exports.uploadBrands = multer({ storage: storageBrands }).single('file')
exports.uploadTypeProducts = multer({ storage: storageTypeProducts }).single('file')
exports.uploadProducts = multer({ storage: storageProducts }).single('file')
exports.uploadEmployee = multer({ storage: storageEmployee }).single('file')
exports.uploadEmployeeCard = multer({ storage: storageEmployeeCard }).single('file')

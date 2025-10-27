const bcrypt = require('bcryptjs');
const db = require('../../db/db')

// Verification function using async/await
async function comparePassword(password, storedHash) {
  try {
    const result = await bcrypt.compare(password, storedHash);
    return result;
  } catch (err) {
    console.error('Error comparing password:', err);
    return false;
  }
}

exports.getHome = async (req, res) => {
  try {
    const results = await db.findAll();
    res.render('pac/admin/index', {
      title: 'Home',
      products: results,
      user: req.session.user
    })
  } catch (err) {
    console.error('Error get data :', err)
    res.status(500).json({ error: 'Home invalid.' })
  }
}

exports.getLogout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect('/');
  } catch {
    console.error('Error logout :', err)
    res.status(500).json({ error: 'Logout invalid.' })
  }
}


exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const sqlGetMail = "SELECT `id`, `name`, `email`, `password`, `role`, DATE_FORMAT(`createdAt`, '%d/%m/%Y %H:%i:%s') as `createdAt`,DATE_FORMAT(`updatedAt`, '%d/%m/%Y %H:%i:%s') as `updatedAt` FROM `user` WHERE `email` = ?";
    await db.execute(sqlGetMail,
      [email], (err, result) => {
        if (err) throw err;
        if (result) {
          const isCorrect = comparePassword(password, result.password);
          if (isCorrect) {
            const profileSessions = {
              id: result.id,
              // idEM: employee.id,
              name: result.name,
              email: result.email,
              password: result.password,
              role: result.role,
              // image: employee.image,
              // nameTH: employee.nameTH,
              // depName: department.nameTH
            }
            console.log(isCorrect)
            req.session.user = profileSessions;
            res.render('pac/admin/index', {
              title: 'Home',
              user: profileSessions,
              dataAlert: null,
              lengthAlert: 0
            });
          } else {
            res.render('/login', {
              title: 'login',
              error_msg: "Password ไม่ถูกต้อง!!"
            });
          }
        } else {
          return res.render('/login', {
            success: false,
            title: 'login',
            error_msg: "Email ไม่ถูกต้องกรุณากรอก email ใหม่ !!!"
          });
        }
      });
  } catch (err) {
    console.error('Error login :', err)
    res.status(500).json({ error: 'Login invalid.' })
  }
}

var express = require('express');
var reserveAssist = require('../support/reserve');
var router = express.Router();

 router.get('/', (req, res) => {
  res.render('admin/adminlogin', { admin: true })
})
router.post('/loginverify', (req,res) => {
  reserveAssist.doLogin(req.body).then((response) => {
    if (response.status) {
      reserveAssist.getReservations().then((reservations) => {
        res.render('admin/dashboard', { admin: true, reservations })
      })
    }
    else {
      res.redirect('/')
    }
  })
})
module.exports = router;

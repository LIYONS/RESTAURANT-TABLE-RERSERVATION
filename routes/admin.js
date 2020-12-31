var express = require('express');
var support = require('../support/reserve');
var router = express.Router();
var mail = require('../support/mail')
let statusformsg=false;

router.get('/', (req, res) => {
  let status=statusformsg;
  res.render('admin/adminlogin', { admin: true,status})
  statusformsg=false;
  
})
router.post('/loginverify', (req, res) => {
    support.doLogin(req.body).then((response) => {
    if (response.status) {
        statusformsg=false
        req.session.loggedIn = true
        req.session.admin = response.admin
        support.getReservations().then((reservations) => {
            res.render('admin/dashboard', { admin: true, reservations })
      })
    }
    else {
      statusformsg=true;
      res.redirect('/admin')
    }
  })
})
router.post('/loginverify/deleterecord', (req, res) => {
 support.deleteRecord(req.body).then((delstatus) => {
    if (delstatus.status) {
      res.redirect('/admin')
      mail.deleteMail(delstatus.data)
    }
  })
})
router.get('/loginverify/logout', (req, res) => {

  req.session.destroy()
  res.redirect('/')
})
module.exports = router;

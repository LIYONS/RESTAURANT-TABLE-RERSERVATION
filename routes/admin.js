var express = require('express');
var support = require('../support/reserve');
var router = express.Router();
var mail = require('../support/mail')
let statusformsg=false;

router.get('/', (req, res) => {
  let admin=req.session.admin
  if(admin){
    res.redirect('/admin/dashboard')
  }
  else{
  let status=statusformsg;
  res.render('admin/adminlogin', { admin: true,status})
  statusformsg=false;
  }
  
})
router.get('/dashboard',(req,res)=>{
  var admin=req.session.admin
  if(admin){
  support.getReservations().then((reservations) => {
    res.render('admin/dashboard', { admin: true, reservations })
  
})
  }
})
router.post('/loginverify', (req, res) => {
    support.doLogin(req.body).then((response) => {
    if (response.status) {
        statusformsg=false
        req.session.loggedIn = true
        req.session.admin = response.admin
      res.redirect('/admin/dashboard')
    }
    else {
      statusformsg=true;
      res.redirect('/admin')
    }
  })
})
router.post('/dashboard/deleterecord', (req, res) => {
 support.deleteRecord(req.body).then((delstatus) => {
    if (delstatus.status) {
      res.redirect('/admin')
      mail.deleteMail(delstatus.data)
    }
  })
})
router.get('/dashboard/logout', (req, res) => {

  req.session.destroy()
  res.redirect('/admin')
})
module.exports = router;

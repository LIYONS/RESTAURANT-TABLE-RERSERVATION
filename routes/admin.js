var express = require('express');
var reserveAssist = require('../support/reserve');
var router = express.Router();
/* admin */
//  router.get('/', function (req, res, next) {
//  reserveAssist.getReservations().then((reservations) => {
//  console.log(reservations)
//  res.render('admin/dashboard', { admin: true, reservations });
//  next()
//  })
//});
router.get('/',(req,res)=>{
  res.render('admin/adminlogin',{admin:true})
})
router.post('/loginverify',(req,res)=>{
  res.send("hello");
})
module.exports = router;

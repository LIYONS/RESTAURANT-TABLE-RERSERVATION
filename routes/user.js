var express = require('express');
var router = express.Router();
var otpGenerator = require('otp-generator')
var bcrypt=require('bcrypt')

var support = require('../support/reserve')
var mail = require("../support/mail")
var db = require('../config/connection');
var availableStatus=false;
var tempReservation;
var tempOtp;
let verificationStatus=false;

router.get('/',async(req, res)=> {
    res.render('user/user', { admin: false });
});
router.get('/contact', (req, res) => {
    res.render('user/contact')
})
router.get('/downloadmenu', (req, res) => {

    res.download('public/images/menu.jpg');
})
router.get('/reserve', (req, res) => {
    var availableStatmsg=availableStatus
    support.getDates().then((dates) => {

        res.render('user/reserve', { dates ,availableStatmsg})
        availableStatus=false
    })
})
router.post('/reserveconfirm',(req,res)=>{
    support.isAvailable(req.body).then((response)=>{
         if(response.status){
             availableStatus=false;
             res.redirect('/verify')
             tempReservation=response.data
             tempOtp=otpGenerator.generate(6, { upperCase: false, specialChars: false });
             mail.otpmail(tempOtp,response.data)
         }
         else {
             availableStatus=true;
             res.redirect('/reserve')
         }
     })
       
 })
router.get('/verify',(req,res)=>{
    var status=verificationStatus;
    res.render('user/verification',{status})
    verificationStatus=false;
})
 router.get('/verify/resend',(req,res)=>{
    mail.otpmail(tempOtp,tempReservation);
    res.redirect('/verify')
})
 router.post('/verify/verification',(req,res)=>{
    
     console.log(req.body)
     if(req.body.otp == tempOtp){
            db.get().collection('reservationdata').insertOne(tempReservation)
            res.render('user/thanks')
             mail.reservationMail(tempReservation)
            delete tempOtp;
            delete tempReservation;            
     }
     else{
        verificationStatus=true
        res.redirect('/verify')
        
     }    
 })
router.post('/contactdone', (req, res) => {
    console.log(req.body)
    mail.contactmail(req.body)
    res.render("user/contact")
})
module.exports = router;

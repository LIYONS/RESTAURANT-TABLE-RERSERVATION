var express = require('express');
var router = express.Router();
var reserveAssist = require('../support/reserve')

var mail = require("../support/mail")

var db = require('../config/connection')


router.get('/', function (req, res, next) {
    res.render('user/user', { admin: false });
});
router.get('/contact', (req, res) => {
    res.render('user/contact')
})
router.get('/downloadmenu', (req, res) => {

    res.download('public/images/menu.jpg');
})
router.get('/reserve', (req, res) => {
    reserveAssist.getDates().then((dates) => {

        res.render('user/reserve', { dates })
    })
})

// router.post('/reserveconfirm', (req, res) => {


//     reserveAssist.isAvailable(req.body)
//     reserveAssist.isAvailable(req.body).then((reservation) => {
//         if (reservation)
//             res.render('user/thanks')
//     }).catch((stat) => {
//         res.render('user/collapse')
//     })

// })
router.post('/reserveconfirm',(req,res)=>{
    console.log(req.body)
    reserveAssist.isAvailable(req.body).then((response)=>{
        if(response.status){
            console.log("confirm")
            res.render('user/thanks')
        }
        else res.render('user/collapse')
    })
      
})
router.post('/contactdone', (req, res) => {
    console.log(req.body)
    mail.contactmail(req.body)
    res.render("user/contact")
})



module.exports = router;

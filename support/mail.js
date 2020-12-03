let nodemailer = require('nodemailer');


module.exports = {

  contactmail: (data) => {



    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'liyonsvarghese2000@gmail.com',
        pass: '#devasiacruzz@123'
      }
    });

    var mailOptions = {
      from: 'liyonsvarghese2000@gmail.com',
      to: 'thebeirutblends360@gmail.com',
      subject: data.subject,
      text: data.message
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
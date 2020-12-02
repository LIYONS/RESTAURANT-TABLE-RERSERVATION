let nodemailer = require('nodemailer');


module.exports = {

  contactmail: (data) => {



    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'reva75@ethereal.email',
        pass: 'VqPgEa34UV9qYmaphQ'
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
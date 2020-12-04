let nodemailer = require('nodemailer');


module.exports = {

  contactmail: (data) => {



    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '#',
        pass: '#'
      }
    });

    var mailOptions = {
      from: '#',
      to: '#',
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

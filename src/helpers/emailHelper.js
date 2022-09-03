import nodemailer from "nodemailer";
// email configuration an send email

// email template

const emailProcessor = async (emailBody) => {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail(emailBody);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};

// make sure the emailData has fName, email and url
export const verificationEmail = (emailData) => {
  const emailBody = {
    from: '"Yubaraj Store 👻" <yubaraj.100mgr@gmail.com>', // sender address
    to: emailData.email, // list of receivers
    subject: "Email Verification instruction", // Subject line
    text: `${emailData.fName}, please follow the link to verify your email: ${emailData.url}`, // plain text body
    html: `
        <p>Hi ${emailData.fName}</p>
        <br/>
        <br/>
        <p> Please follow the link to verify your email</p>
        <br/>
        <br/>
        <p> <a href ="${emailData.url}">verify email</a></p>
        <p>
            Regards, <br/>
            Yubaraj Magar Store
        </p>
        `, // html body
  };
  emailProcessor(emailBody);
};

// make sure the emailData has fName, email and url
export const verificationNotification = (emailData) => {
  const emailBody = {
    from: '"Yubaraj Store 👻" <yubaraj.100mgr@gmail.com>', // sender address
    to: emailData.email, // list of receivers
    subject: "Your account has been verified", // Subject line
    text: `${emailData.fName}, Your account has been verified, you may logged in now: ${emailData.url}`, // plain text body
    html: `
        <p>Hi ${emailData.fName}</p>
        <br/>
        <br/>
        <p>Your account has been verified, you may logged in now.<a href="${process.env.ROOT_DOMAIN}"/> ${process.env.ROOT_DOMAIN}</p>
        `, // html body
  };
  emailProcessor(emailBody);
};

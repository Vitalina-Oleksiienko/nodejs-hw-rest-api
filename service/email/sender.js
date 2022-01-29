import sgMail from '@sendgrid/mail'
import nodemailer from 'nodemailer'

class SenderSendgrid { 
  async send(msg) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    return await sgMail.send({...msg, from: process.env.SENDER_SENDGRID})
  }
}

class SenderNodemailer {
  async send(msg) {
    const config = {
      host: "smtp.mail.me.com",
      port: 587,
      secure: true, // upgrade later with STARTTLS//
      auth: {  
        user: process.env.SENDER_NODEMAILER,
        pass: "password",
      },
    }
    const transporter = nodemailer.createTransport(config)
    return await transporter.sendMail({...msg, from: process.env.SENDER_NODEMAILER})
  }
}

export {SenderSendgrid, SenderNodemailer}
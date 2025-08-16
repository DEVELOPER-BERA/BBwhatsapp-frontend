const nodemailer = require('nodemailer');

exports.sendEmail = async (options) => {
    // Create a transporter (in production, use real SMTP settings)
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
        port: process.env.SMTP_PORT || 2525,
        auth: {
            user: process.env.SMTP_USER || 'your_mailtrap_user',
            pass: process.env.SMTP_PASS || 'your_mailtrap_pass'
        }
    });

    // Define email options
    const mailOptions = {
        from: 'BBWhatsApp <no-reply@bbwhatsapp.com>',
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    // Send email
    await transporter.sendMail(mailOptions);
};

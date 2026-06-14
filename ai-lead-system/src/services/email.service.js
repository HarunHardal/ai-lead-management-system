const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendOfferEmail = async (lead, pdfPath) =>{
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: lead.email,
        subject: "Size Özel Teklifimiz",
        text: "Teklifimiz Ektedir.",
        attachments: [
            {
                filename: "offer.pdf",
                path: pdfPath
            }
        ]
    });

};
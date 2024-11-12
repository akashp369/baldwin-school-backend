const response = require("../middleware/responseMiddleware");
const asyncHandler = require("express-async-handler");
const nodemailer = require('nodemailer');
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASS,
    }
});

const sendContactFormToMail = asyncHandler(async (req, res) => {
    try {
        const { name, email, mobile, className, howDidYouHear } = req.body;

        const mailOptions = {
            from: process.env.APP_EMAIL,
            to: 'principal@baldwingirls.edu.in',
            // to: 'aakashprajapat59@gmail.com',
            subject: 'New Enquiry Received',
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mobile:</strong> ${mobile}</p>
                <p><strong>Class:</strong> ${className}</p>
                <p><strong>Message:</strong></p>
                <p>${howDidYouHear}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        response.successResponse(res, null, "Enquiry sent successfully.");
    } catch (error) {
        response.internalServerError(res, error.message || "Failed to send enquiry.");
    }
});

module.exports = { sendContactFormToMail };

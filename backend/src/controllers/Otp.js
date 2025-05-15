const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { generateOTP, sendOTPEmail } = require("../services/otpService.js");
const prisma = require("../config/db.js");

// Generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};



const sendOTPEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Registration',
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    });
    console.log(`Sending OTP ${otp} to ${email}`);
  } catch (error) {
    throw new Error('Failed to send OTP email');
  }
};



const requestOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    // Generate OTP
    const otp = generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP in database
    await prisma.otp.create({
      data: {
        email,
        otp: hashedOTP,
        expiresAt,
      },
    });

    // Send OTP
    await sendOTPEmail(email, otp);

    res.status(200).json({ message: "OTP sent to your email" });

  } catch (error) {
    console.error("Error in OTP request:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { requestOtp };


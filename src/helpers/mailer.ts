import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //TODO: configure mail for usage
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    //const hasdedToken = "abc123"
    console.log("MAIL", userId);
    console.log("EMAIL TYPE", emailType);
    console.log(typeof emailType);

    if (emailType === "VERIFY") {
      console.log("VERIFY SECTION");
      const updatedUser = await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
      console.log("UPDATE user for VERIFY", updatedUser);
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "188e9a53f5be62",
        pass: "7739a0ceecd130",
      },
    });

    const verifyemail = `<p>Click <a href="
      ${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to 
      ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy paste the link below in your browser.<br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`;

    const mailOptions = {
      from: "KhoaDamDev.ai", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
      html: verifyemail, // html body
    };

    const mailRespone = await transport.sendMail(mailOptions);

    return mailRespone;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

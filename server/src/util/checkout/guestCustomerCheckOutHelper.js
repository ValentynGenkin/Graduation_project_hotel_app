import User from "../../models/User.js";
import { validateCheckOutInput } from "../input/inputValidator.js";
import { registrationEmail } from "../mailer/mailTemplates.js";
import sendEmail from "../mailer/sendEmail.js";

export const guestCustomerCheckOutHelper = async (req, booking, next) => {
  const userObj = validateCheckOutInput(req, next);
  const customer = await User.create(userObj);
  const resetPasswordToken = customer.getResetPasswordTokenFromUser();
  await customer.save();
  const resetPasswordUrl = `${process.env.BASE_CLIENT_URL}/customer/resetpassword?reset_password_url=${process.env.BASE_SERVER_URL}/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;
  booking.customerId = customer._id;
  booking.guestCustomerId = null;

  sendEmail({
    from: process.env.SMTP_USER,
    to: customer.email,
    subject: "Welcome to Hotel",
    html: registrationEmail(customer.firstname, resetPasswordUrl),
  });

  return await booking.save();
};

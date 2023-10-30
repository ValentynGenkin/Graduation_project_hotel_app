import User from "../../models/User.js";
import { validateCheckOutInput } from "../input/inputValidator.js";
import { registrationEmail } from "../mailer/mailTemplates.js";
import sendEmail from "../mailer/sendEmail.js";

export const guestCustomerCheckOutHelper = async (req, booking, next) => {
  const userObj = validateCheckOutInput(req, next);
  const customer = await User.create(userObj);
  booking.customerId = customer._id;
  booking.guestCustomerId = null;

  sendEmail({
    from: process.env.SMTP_USER,
    to: customer.email,
    subject: "Welcome to Hotel",
    html: registrationEmail(customer.firstname, req.body.guestCustomerId),
  });

  return await booking.save();
};

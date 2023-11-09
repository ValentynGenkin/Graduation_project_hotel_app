export const registrationEmail = (firstname, resetPasswordUrl) => {
  return String.raw`
  Welcome ${firstname},
  You have registered succesfully!
  ${
    resetPasswordUrl
      ? "You can create your password with this link: " + resetPasswordUrl
      : ""
  }
  `;
};

export const resetPasswordEmail = (resetPasswordUrl) => {
  return String.raw`
  <h3>Reset Your Password</h3>
  <p>This <a href=${resetPasswordUrl} target="_blank">link</a> will expire in 1 hour</p>
  `;
};
export const passwordChangedEmail = () => {
  return String.raw`
  <p>Your password is changed successfully</p>
  `;
};
export const adminRegistrationEmail = (firstname, email, password) => {
  return String.raw`
  Welcome ${firstname},
  You have registered successfully!
  This is your Admin Account:
  Email: ${email},
  Password: ${password}
  `;
};

export const inBranchBookingEmail = (firstname, bookingId) => {
  return String.raw`
  Welcome ${firstname},
  Your booking is created successfully.
  
  Your Booking ID: ${bookingId}
  `;
};

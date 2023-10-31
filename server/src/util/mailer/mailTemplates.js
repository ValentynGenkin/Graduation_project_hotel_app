export const registrationEmail = (firstname, password) => {
  return String.raw`
  Welcome ${firstname},
  You have registered succesfully!
  ${password ? "Your password: " + password : ""}
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

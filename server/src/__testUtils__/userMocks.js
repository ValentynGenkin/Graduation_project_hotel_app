import User from "../models/User";

export const addUserToMockDB = async (newUser) => {
  const { firstname, lastname, phone, password, email } = newUser;
  if (!(firstname && lastname && phone && password && email)) {
    throw new Error(
      `Invalid user attempting to be added to the Database. User attempted to be added: ${JSON.stringify(
        newUser
      )}.`
    );
  }

  const user = new User(newUser);
  await user.save();
};

export const findUserInMockDB = async (userId) => {
  if (typeof userId !== "string") {
    throw new Error(
      `Invalid userId given! Should be a string, but received: ${userId}`
    );
  }

  const user = await User.findById(userId);

  return user;
};

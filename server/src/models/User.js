import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "try another email"],
  },
  phone: {
    type: String,
    required: false,
  },
  birthday: {
    type: Date,
    required: false,
  },
  payment: {
    type: String,
    required: false,
    enum: ["iDeal", "PayPal", "Credit Card"],
  },
  role: {
    type: String,
    default: "customer",
    enum: ["customer", "admin"],
  },
  password: {
    type: String,
    minlength: [6, "Please enter a valid password"],
    required: [true, "Please enter a valid password"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
});

UserSchema.methods.generateJwtFromUser = function () {
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
  const payload = {
    id: this._id,
    firstname: this.firstname,
    lastname: this.lastname,
    email: this.email,
    phone: this.phone,
    birthday: this.birthday,
    payment: this.payment,
    role: this.role,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE });
  return token;
};
UserSchema.methods.getResetPasswordTokenFromUser = function () {
  const { RESET_PASSWORD_EXPIRE } = process.env;
  const randomHexString = crypto.randomBytes(15).toString("hex");
  const resetPasswordToken = crypto
    .createHash("SHA256")
    .update(randomHexString)
    .digest("hex");

  this.resetPasswordToken = resetPasswordToken;
  this.resetPasswordExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE);

  return resetPasswordToken;
};

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) next(err);
      this.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", UserSchema);

export default User;

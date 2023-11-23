import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const passValid = (password) => validator.isStrongPassword(password);
const emailValid = (email) => validator.isEmail(email);
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema(
  {
    userId: { type: ObjectId, ref: "User" },
    name: String,
    email: { type: String, validate: [emailValid, "email is not valid "] },
    password: { type: String, validate: [passValid, "password is not valid"] },
    number: String,
    dob: Date,
    age: { type: Number, min: 0 },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    address: {
      address: String,
      area: String,
      state: String,
      pincode: Number,
    },
    userType: {
      type: String,
      required: true,
      enum: ["principle", "student", "teacher"],
      default: "student",
    },
    totalPaidFees: {
      type: Number,
      default: 0,
    },
    salary: {
      type: Number,
      default: 0,
    },
    verified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    return next(error);
  }
});

export default mongoose.model("User", userSchema);

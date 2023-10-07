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
    number: Number,
    dob: Date,
    age: Number,
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
    },
    totalPaidFees: {
      type: Number,
      default: 0,
    },
    salary: {
      type: Number,
      default: 0,
    },
    verified: { type: Boolean },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export default mongoose.model("User", userSchema);

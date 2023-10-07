import mongoose from "mongoose";

const salarySchema = mongoose.Schema({
  teacher: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Salary", salarySchema);

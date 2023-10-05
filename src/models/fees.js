import mongoose from "mongoose";

const feesSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  description: String,
});

export default mongoose.model("Fees", feesSchema);

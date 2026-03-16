import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Le nom est requis"],
      trim: true,
    },
    photo: {
      type: String,
      required: [true, "La photo est requise"],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Member = mongoose.model("Member", memberSchema);

export default Member;

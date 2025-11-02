import mongoose from "mongoose";

const albumShema = new mongoose.Schema({
  title: { type: String, required: true },
  coverImage: { type: String, required: true },
  photos: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Album", albumShema);

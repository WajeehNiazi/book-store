// models/author.js
import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    biography: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.models.Author || mongoose.model("Author", authorSchema);

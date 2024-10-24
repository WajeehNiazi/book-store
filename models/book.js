// models/book.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    authorId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    genreId: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    isFeatured: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });

export default mongoose.models.Book || mongoose.model("Book", bookSchema);

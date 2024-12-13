import connectDB from "@/lib/mongoose";
import Book from "@/models/book";

export default async function handler(req, res) {
    if (req.method === "GET"){
        const { id } = req.query;
        try {
            await connectDB();
            const books = await Book.find({ genreId: id });
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
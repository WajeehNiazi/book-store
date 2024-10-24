import connectDB from "@/lib/mongoose";
import Book from "@/models/book";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            await connectDB();
            const { id } = req.query;
            const book = await Book.findOne({ id });
            if (!book) return res.status(404).json({ message: "Book not found" });
            res.status(200).json(book);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}

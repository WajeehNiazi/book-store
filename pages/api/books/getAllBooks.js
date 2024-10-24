import connectDB from "@/lib/mongoose";
import Book from "@/models/book";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    await connectDB();

    try {
        const books = await Book.find();
        res.status(200).json(books);
    }   catch (error) {
        res.status(500).json({ message: "Error getting books", error: error.message });
    }
}
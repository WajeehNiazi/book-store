// pages/api/seed/seedAuthors.js
import connectDB from "@/lib/mongoose";
import Author from "@/models/author";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    await connectDB();

    const authors = [
        { id: "1", name: "F. Scott Fitzgerald", biography: "An American novelist and short story writer." },
        { id: "2", name: "Harper Lee", biography: "An American novelist known for 'To Kill a Mockingbird'." },
        { id: "3", name: "George Orwell", biography: "An English novelist and essayist." },
        { id: "4", name: "Jane Austen", biography: "An English novelist known for her social commentary." },
        { id: "5", name: "J.D. Salinger", biography: "An American writer known for 'The Catcher in the Rye'." },
        { id: "6", name: "Paulo Coelho", biography: "A Brazilian lyricist and novelist." },
    ];

    try {
        await Author.insertMany(authors);
        res.status(201).json({ message: "Authors added successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error adding authors", error: error.message });
    }
}

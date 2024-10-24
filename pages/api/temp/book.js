// pages/api/seed/seedBooks.js
import connectDB from "@/lib/mongoose";
import Book from "@/models/book";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    await connectDB();

    const books = [
        {
            id: "1",
            title: "The Great Gatsby",
            authorId: "1",
            description: "A novel about the American dream and the disillusionment that comes with it.",
            price: 10.99,
            genreId: "1",
            rating: 4.4,
            isFeatured: true,
        },
        {
            id: "2",
            title: "To Kill a Mockingbird",
            authorId: "2",
            description: "A novel set in the Deep South and focused on themes of racial injustice and moral growth.",
            price: 12.99,
            genreId: "1",
            rating: 4.8,
            isFeatured: false,
        },
        {
            id: "3",
            title: "1984",
            authorId: "3",
            description: "A dystopian novel that explores the dangers of totalitarianism and extreme political ideology.",
            price: 14.99,
            genreId: "2",
            rating: 4.7,
            isFeatured: true,
        },
        {
            id: "4",
            title: "Pride and Prejudice",
            authorId: "4",
            description: "A romantic novel that charts the emotional development of the protagonist, Elizabeth Bennet.",
            price: 9.99,
            genreId: "3",
            rating: 4.6,
            isFeatured: false,
        },
        {
            id: "5",
            title: "The Catcher in the Rye",
            authorId: "5",
            description: "A story about teenage rebellion and alienation narrated by the protagonist Holden Caulfield.",
            price: 11.99,
            genreId: "1",
            rating: 4.0,
            isFeatured: true,
        },
        {
            id: "6",
            title: "The Alchemist",
            authorId: "6",
            description: "A philosophical book that tells the story of Santiago, a shepherd boy on a journey to discover his personal legend.",
            price: 13.99,
            genreId: "4",
            rating: 4.5,
            isFeatured: false,
        },
    ];

    try {
        await Book.insertMany(books);
        res.status(201).json({ message: "Books added successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error adding books", error: error.message });
    }
}

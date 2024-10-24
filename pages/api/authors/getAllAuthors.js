import connectDB from "@/lib/mongoose";
import Author from "@/models/author";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    await connectDB();

    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: "Error getting authors", error: error.message });
    }
}
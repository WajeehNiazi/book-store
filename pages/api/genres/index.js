import connectDB from "@/lib/mongoose";
import Genre from "@/models/genre";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    await connectDB();

    try {
        const genres = await Genre.find();
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ message: "Error getting genres", error: error.message });
    }
}
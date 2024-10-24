import connectDB from "@/lib/mongoose";
import Author from "@/models/author";

export default async function handler (req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        await connectDB();
        const { id } = req.query;
        console.log(id);
        console.log("Hello")
        const author = await Author.findOne({ id });
        if (!author) return res.status(404).json({ message: "Author not found" });
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
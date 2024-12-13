import User from "@/models/user";
import connectDB from "@/lib/mongoose";

export default async function handler (req, res){
    if (req.method === "GET"){
        const { id } = req.query;

        if(!id){
            return res.status(400).json({ message: "User ID is required." });
        }

        try{
            await connectDB();
            const user = await User.findById(id);
            if(!user){
                return res.status(404).json({ message: "User not found." });
            }
            return res.status(200).json(user.history);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }
    }
    else if (req.method === "POST"){
        const { id, query } = req.body;
        console.log(id, query);
        if( !id || !query ){
            return res.status(600).json({ message: "User ID and query are required." });
        }

        try {
            await connectDB();
            const user = await User.findById(id);

            if(!user){
                return res.status(404).json({ message: "User not found." });
            }

            if (!user.history.includes(query)) {
                user.history.push(query);
                await user.save();
            }

            res.status(200).json({ message: "Search query added to history", history: user.history }); 
        } catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }
    }
}
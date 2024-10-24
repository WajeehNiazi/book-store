import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongoose';
import User from '@/models/user';

export default async function handler (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed." });
    }
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    
    await connectDB();
    console.log('connected to db');
    

    try {
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).json({ message: "User created successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

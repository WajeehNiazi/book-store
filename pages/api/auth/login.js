import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongoose';
import User from '@/models/user';

export default async function handler (req, res) {
    const { email, password } = req.body;

    await connectDB();

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist." });
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        return res.status(200).json({
            id: existingUser._id.toString(),
            email: existingUser.email,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
}
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userSchema.js'

export const signupUser = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ username, email, password: hashedPassword })
        res.status(201).json({ message: 'User created', userId: user._id })
    } catch (err) {
        res.status(500).json({ error: 'Signup failed' })
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).json({ message: 'Login successful', token, 
            user: {
                userId: user._id,
                username: user.username,
                email: user.email
            }
         })
    } catch (err) {
        res.status(500).json({ error: 'Login failed' })
    }
}

export const logoutUser = (req, res) => {
    res.status(200).json({ message: 'Logout successful' })
}

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
};

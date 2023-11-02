import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel';
require('dotenv').config();

const router = express.Router(); 

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, mail, password } = req.body;
        
        let user = await userModel.findOne({ mail }); // Check if the mail is already in use
        if (user) return res.status(400).json({ error:'Email already in use' });

        // Create the new user
        const newUser = new userModel({
            username, 
            mail,
            password: await bcrypt.hash(password, 10), // Hash the password before saving to db
        });
        await newUser.save();

        const foundUser = await userModel.findOne({ mail });
        const userId = foundUser?._id;
        if (!userId) return res.status(500).json({ error: 'Could not create user' });

        const payload = { userId: userId }; // Create a JWT payload with the user's ID

        if (!process.env.JWT_SECRET) return res.status(500).json({ error: 'JWT secret is not defined' });
        const token = jwt.sign(payload, process.env.JWT_SECRET );
        res.status(200).json({token});    
    }catch(err){
        // ERROR Handling
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Log in a user
router.post('/login', async (req, res) => {
    try {
        const { mail, password } = req.body;

        const user = await userModel.findOne({mail}); 
        if (!user) return res.status(401).json({ error: 'Email not found' }) 

        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' }) 
    
        // Generate a JWT with the user's ID
        const payload = { userId: user._id }; 

        if (!process.env.JWT_SECRET) return res.status(500).json({ error: 'JWT secret is not defined' });
        const token = jwt.sign(payload, process.env.JWT_SECRET );
    
        res.status(200).json({token}); // SUCCESS
        }catch(err){
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
});

// Log out a user 
router.post('/logout', (req, res) => {
    res.cookie('token', '', { maxAge: 0 }); // Clear the cookie
    res.status(200).json();
}); 

// Get the currently logged in user from the JWT
router.get('/me', async (req, res) => { 
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
    
        // Verify the JWT and extract the user's ID
        if (!token) return res.status(401).json({ error: 'Unauthorized' });
        if (!process.env.JWT_SECRET) return res.status(500).json({ error: 'JWT secret is not defined' });
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
    
        // Find the user in the database
        const user = await userModel.findById(userId).select('-password'); // Exclude the password
        if (!user) return res.status(401).json({ error: 'Unauthorized' });
    
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router; 
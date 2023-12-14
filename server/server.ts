import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import gameModel from './models/gameModel';
import { Server } from 'socket.io';
import http from 'http';
// get user and game routers
const userRoutes = require('./routes/userRoutes');
const gameRoute = require('./routes/gameRoute');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173','http://192.168.100.153:5173'],
        credentials: true
    }
});

//MIDDLEWARE >>>
app.use(express.json()); //built-in function in Express, parses incoming requests with JSON payloads
app.use(cors({ origin: ['http://localhost:5173','http://192.168.1.4:5173'], credentials: true })); 
app.use((req: any, res: any, next: any) => { 
    console.log(`A new request: ${req.method} ${req.path}`);
    next();
}); 

//ROUTES >>>>
app.use('/', userRoutes);
app.use('/game', gameRoute);

// Define Socket.io logic here
io.on('connection', (socket: any) => {
    socket.on('connect', () =>  console.log('user', socket.id ,'connected'))

    // Handle table creation
    socket.on('createTable', async (req: any) => {
        const table = new gameModel({
            tableId: Math.floor(1000+Math.random()*9000), // Generate a random 4-digit number
            player1: {
                id: socket.id,
                name: req.body.name,
                board: []
            },
            player2: {
                id: '',
                name: '',
                board: []
            },
        });
        await table.save();
        socket.emit('tableCreated', table);
    });

    // Handle table joining
    socket.on('joinTable', async (req: any) => {
        const table = await gameModel.findOne({ tableId: req.body.tableId });
        if (table && table.player2.id.length === 0) {
            table.player2.id = socket.id;
            table.player2.name = req.body.name;
            await table.save();
            socket.to(socket.id).emit('tableJoined', table);
            socket.broadcast.emit('tableJoined', table);
        } else {
            socket.to(socket.id).emit('tableJoinError', 'Table not found or already full');
        }
    });

    // Handle socket.io events here
    socket.on('move', (data: any) => {
        console.log(data);
        socket.broadcast.emit('move', data);
    });
    
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
});

// Connect to the database and start the server
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL as string)
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
    })
    .catch((err: any) => console.log(err));
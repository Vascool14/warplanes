import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { Server as SocketIoServer } from 'socket.io'; 
import http from 'http';
const gameRoute = require('./routes/gameRoute');
dotenv.config();

const app = express();
const server = new http.Server(app);    
const io = new SocketIoServer(server, {
    cors: {
        origin: ['http://localhost:5173','http://192.168.1.4:5173'],
        methods: ['GET', 'POST'],
    },
});


//MIDDLEWARE >>>
app.use(express.json()); //built-in function in Express, parses incoming requests with JSON payloads
app.use(cors({
    origin: ['http://localhost:5173','http://192.168.1.4:5173'], credentials: true  // allow cookies
})); 
app.use((req: any, res: any, next: any) => { 
    console.log(`new request: ${req.method} ${req.path}`);
    next();
}); 

//ROUTES >>>>
app.use('/game', gameRoute);

// Define Socket.io logic here
io.on('connection', (socket: any) => {
    console.log('A user connected');

    // Handle socket.io events here
    // socket.on('emit', (data: any) => {
    //     console.log(data);
    //     socket.emit('emit', data);
    // });
    
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Connect to the database and start the server
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL as string)
    .then(() => {
        server.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
    })
    .catch((err: any) => console.log(err));

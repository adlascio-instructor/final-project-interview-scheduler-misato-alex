const express = require("express");
const app = express();
const port = 8000;
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const daysRouter = require("./routes/days_router");
const scheduleRouter = require("./routes/schedule_router");
const {Sockets} = require("./socket");

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  }
});

app.use('/days', daysRouter);
app.use('/schedule', scheduleRouter);

Sockets(io);

server.listen(port, () => console.log(`Server is running on port ${port}`));

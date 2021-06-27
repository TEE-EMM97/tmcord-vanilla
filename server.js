// Imports path module into our app
const path = require('path');
// Imports http module into our app
const http = require('http');
// Imports express module to our app
const express = require('express');
//
const socketio = require(`socket.io`);

const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrUser,
  userLeaves,
  getRoomUsers,
} = require('./utils/users');

const botName = 'TMCord Bot';

//Initiialises express module in our `app` variable
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Run when client connects

//This IO object will listen for an (event) another client coonction
io.on('connection', (socket) => {
  console.log(`New websocket connection`);

  //Runs when client connects
  socket.on(`joinRoom`, ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);
    // We emit this message when a user joins a space to the console
    // This prints out to the source client
    // socket.emit(`message`, `welcome to tevcord!`)

    socket.emit(`message`, formatMessage(botName, `welcome to tmcord!`));

    // Broadcast when a user connects
    // Difference between the code above is the this only sends data to everyone but the use connecting
    // socket.broadcast.emit(`message`, `A user has joined the chat`)
    // socket.broadcast.emit(
    //   `message`,
    //   formatMessage(botName, `A user has joined the chat`)
    // );

    socket.broadcast
      .to(user.room)
      .emit(
        `message`,
        formatMessage(botName, `A ${user.username} has joined the chat`)
    );
    
    //Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    })
  });

  // Listen for Chat Message
  socket.on(`chatMessage`, (msg) => {
    const user = getCurrUser(socket.id);
    io.to(user.room).emit(`message`, formatMessage(user.username, msg));
    console.log(msg);
  });

  // Runs when client disconnects
  socket.on(`disconnect`, () => {
    const user = userLeaves(socket.id);
    if (user) {
      io.to(user.room).emit(
        `message`,
        formatMessage(botName, `A ${user.username} has left the chat`)
      );
    }
    // io.emit(`message`, formatMessage(botName, `A ${user.username} has left the chat`));
  });

  // This sends to everybody
  // io.emit(`message`, `Hey y'all`)
});

//Specifies port we want to run from
const PORT = 8000 || process.env.PORT;

//Set static folder to serve files from
app.use(express.static(path.join(__dirname, 'public')));

//Listens to server on specified port
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

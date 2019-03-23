const express = require('express');

const app = express();

const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);


const publicDir = path.join(__dirname, '../public');
const indexDir = path.join(__dirname, '../views/index.html');


const port = process.env.PORT || 3000;


app.use(express.static(publicDir));

app.get('/', (req, res) => {
  res.sendFile(indexDir);
});

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);

  socket.on('disconnect', () => {
    console.log(`${socket.id} has disconnected`)
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg, socket.id);
  });

});

http.listen(port, () => {
  console.log(`Listening at port ${port}!`);
});
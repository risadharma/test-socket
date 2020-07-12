const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');


const port = process.env.PORT || 8084;
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());


io.on('connection', (socket) => {
  console.log("client connected");
  socket.on('disconnected', () => console.log('unfotunately, client is disconnected :('));
});

app.post('/testSocket', (req, res) => {
  let { body } = req;

  io.emit("newGuess", body);
  res.status(200).send("success")
});

server.listen(port, () => console.log(`Listening on port ${port}`));



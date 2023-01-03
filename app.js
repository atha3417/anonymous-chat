const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.html');
});

io.on('connection', socket => {
    console.log("Socket connected!");
    socket.on('kirim-pesan', pesan => {
        socket.broadcast.emit('pesan-baru', pesan);
    });
});

server.listen(port, () => {
    console.log('Server running on port ' + port);
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const {setupWebSocket} = require('./websocket');

const app = express();  
//extrai o http do express() para passar a ouvir tambem o webSocket
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect('mongodb+srv://heitor:heitor@cluster0-eoefe.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,

})
app.use(cors());
//app.use(cors({ origin : 'http://localhost:3000'}));
app.use(express.json());
app.use(routes);
//app.listen(3333);
server.listen(3333);
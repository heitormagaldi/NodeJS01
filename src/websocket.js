
//biblioteca que nos ajuda a trabalhar com sockets

const soketio = require('socket.io');

const connections = [];

let io;

const parseStringAsArray = require('./utils/parseStringAsArray'); 
const calculateDistance = require('./utils/calculateDistance'); 

exports.setupWebSocket = (server) =>{
  io = soketio(server);
  io.on('connection', socket=> { // event listener
    
    console.log(socket.id);
    //console.log(socket.handshake.query);
    //1º teste comunicação do socket
    /*setTimeout( ()=> {
      socket.emit('message', 'Hello Socket Funcionando')
    },3000); //*/

    const {latitude, longitude, techs } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates:{
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseStringAsArray(techs),
    });
     
  }); 
};

exports.findConnections = (coordinates,techs) =>{
  return connections.filter(connection => {
    return calculateDistance(coordinates, connection.coordinates) < 10
    && connection.techs.some(item => techs.includes(item))

  })
} 

exports.sendMessage = (to, message, data) => {
  to.forEach(connections=>{
    io.to(connection.id).emit(message,data);
  })
}

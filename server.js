const net = require('net') ;

let sockets = [] ; //end point of the connections between two program

const server = net.createServer(socket => {

    sockets.push(socket) ;
    // console.log('socket' , socket);
    console.log("Client connnected!!");

    socket.on('data' , data => {
        broadcast(data,socket) ;
    }) ;

    socket.on('error' , err =>{
        console.log('A client has disconnected.',err);
    }) ;

    socket.on('close' , () =>{
        console.log('A client has left the chat!!');
    }) ;

}) ;

server.listen(1234) ;


function broadcast (message , socketSent) {

    if(message.toString() === 'quit') {
        const index = sockets.indexOf(socketSent) ;
        sockets.splice(index,1) ;
    } else{
        sockets.forEach(socket =>{
            if(socket !== socketSent) socket.write(message) ;
        })
    }
}
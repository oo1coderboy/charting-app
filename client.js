const net = require('net') ;

const readLine = require('readline').createInterface ({
    input: process.stdin ,
    output: process.stdout
}) ;

const waitForUsername = new Promise (resolve => {
    readLine.question('Enter a username to join the chat: ' , username =>{
        resolve(username) ;
    })
}) ;


waitForUsername.then(username=>{

    const socket = net.connect({
        port: 1234 
    }) ;

    socket.on('connect' , ()=>{
        socket.write(`${username } has joined the chat.`) ;
    }) ;

    readLine.on('line' , data =>{
        if(data==='quit') {
            socket.write(`${username} has left the chat.`) ;
            socket.setTimeout(1000) ;
        } else{
            socket.write(`${username}: ${data}`) ;
        }
    }) ;

    socket.on('data' , data =>{
        console.log('\x1b[33m%s\x1b[0m', data.toString());
        // console.log(data);
    }) ;

    socket.on('timeout' , () =>{

        socket.write('quit') ;
        socket.end() ;
        // process.exit() ;
    }) ;

    socket.on('end' , () =>{
        console.log('Disconnected from server.');
        process.exit() ;
    }) ;

    socket.on('error' , err =>{
        console.log('Error: ',err);
    });
});
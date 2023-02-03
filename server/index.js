// there are two servers, one for frontend where index template and client.js file is executing and one for backend which is this index.js. These are connected by through index template

// Node server which will handle socket io connections

// initializing the server and the port is "8000"
const io = require('socket.io')(8000);

// user dictionary for handling users
const users = {};

// server when 'on' it would listen to following events and server instance
io.on('connection', socket =>{

    // when new user joins, it would make a id and broadcast message to all other users
    socket.on('new-user-joined',name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    })
    
    // when any user send a message it would it would broadcast it to other users with his name and message
    socket.on('send',message =>{
        socket.broadcast.emit('recieve',{message : message, name : users[socket.id]});
    });

    // when any user disconnect it would let other users know 
    // # NOTE: 'disconnect' event is build and other events like 'send' and 'new-user-joined' is user defined
    socket.on('disconnect',message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
        console.log('submit');
    });


})

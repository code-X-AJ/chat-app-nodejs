// there are two servers, one for frontend where index template and client.js file is executing and one for backend which is this index.js. These are connected by through index template


// here we make a instance of backend server 'socket'
const socket = io('http://localhost:8000');

// Get DOM elements in respective JS variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

// this function would take message and its position, and add them in the container of frontend for display
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

// form submission; append them in container and emit the event for send which would broadcast the message to other users too.
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message)
    messageInput.value = ""
    console.log('submit');
})

// Ask user for his name and let the server know
const name = prompt("Enter your name to join: ");
socket.emit('new-user-joined', name);


// this event would be called from server
// if new user joins, recieve his name from the server
socket.on('user-joined', name=>{
    append(`${name} joined the chat`,'right')
})

// It accepts the message from server
socket.on('recieve', data=>{
    append(`${data.name}: ${data.message}`,'left')
    console.log('recieve')
})

// If a user leaves the chat, append the info to the container
socket.on('left', name=>{
    append(`${name}: left the chat`,'left')
    console.log('disconnect');
})



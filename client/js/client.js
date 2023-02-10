const socket = io('http://localhost:8000')
const audio = new Audio('../images/sound.mp3')
const form = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const messageContainer = document.querySelector(".container");

const append = (message,position)=>{
    const username = "<span>"+message.slice(0,message.indexOf(':')+1)+"</span>";
    const usernameElement = document.createElement('span');
    usernameElement.innerHTML=username;
    usernameElement.style.fontWeight='bold';
    usernameElement.style.color='#000';
    const msgElement = document.createElement('div');
    msgElement.appendChild(usernameElement);
    msgElement.append(message.slice(message.indexOf(':')+1));
    const messageElement = document.createElement('div');
    messageElement.appendChild(msgElement);
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left')
    audio.play();
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    if(message.length>0){
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value="";
    }
})

const name = prompt("Enter your name to join");
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'left');
});

socket.on('receive',(data)=>{
    append(`${data.name}: ${data.message}`,'left');
})

socket.on('left',(name)=>{
    append(`${name} left the chat`,'left');
})


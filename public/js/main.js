// Make changes to this after server and script tag has been added

// Instantiates the socket frame work
const socket = io();

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

console.log(username, room)

const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Join chatroom
socket.emit(`joinRoom`, { username, room })

//Get room and users 
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
})

//Message from server
socket.on(`message`, (message) => {
  console.log(message);
  outputMessage(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
});


socket.emit(`joinRoom`, {username, room})
// Dom selects the chatform
const chatForm = document.getElementById(`chat-form`);

//Targets chats messages
const chatMessages = document.querySelector('.chat-messages');
  
//Message submit
chatForm.addEventListener(`submit`, (e) => {
  e.preventDefault();

  //Initialises input from user in `msg` variable
  let msg = e.target.elements.msg.value;

  msg = msg.trim()

  if (!msg) {
    return false;
  }

  //Emits message to server
  socket.emit(`chatMessage`, msg);

  //Clear input 
  e.target.elements.msg.value = ''
  e.target.elements.msg.focus()
});

// output message to dom
const outputMessage = (message) => {
  const div = document.createElement(`div`);
  // adds class to created div above
  div.classList.add(`message`);

  //Dummy hard code finformation
  // div.innerHTML = `<p class="meta">TM97<span>9:12pm</span></p>
  //   <p class="text">
  //   ${message}
  //   </p>`;
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
    ${message.text}
    </p>`;
  document.querySelector('.chat-messages').appendChild(div);
};


//Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

//Add user name to Dom
function outputUsers(users) {
  userList.innerHTML = `
  ${users.map(user => `<li>${user.username}</li>`).join('')}`
  console.log(users)
}
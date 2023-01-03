const container = document.getElementById('container');
const wrapper = document.getElementById('chat-wrapper');
const input = document.getElementById('input');
const send = document.getElementById('send');
const socket = io();

const addNewChat = (input) => {
    const bubbleChat = createBubbleChat(input.value);
    bubbleChat.classList.add('text-r');
    wrapper.appendChild(bubbleChat);
    socket.emit('kirim-pesan', input.value);
    input.value = '';
};

const createBubbleChat = (chat) => {
    const div = document.createElement('div');
    div.classList.add('chat');
    div.innerHTML = chat;
    return div;
};

input.addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
        addNewChat(input);
    }
});

send.addEventListener('click', function () {
    addNewChat(input);
});

socket.on('connect', () => console.log("Socket connected!"));

socket.on('pesan-baru', pesan => {
    const bubbleChat = createBubbleChat(pesan);
    bubbleChat.classList.add('text-l');
    wrapper.appendChild(bubbleChat);
});
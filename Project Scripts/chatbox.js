function sendMessage() {
    let messageInput = document.getElementById('message');
    let message = messageInput.value;

    messageInput.value = "";

    displayMessage("You", message);
}   

function displayMessage(sender, message) {
    let chatbox = document.getElementById('Chatbox');
    let messageElement = document.createElement('div');
    messageElement.textContent = sender + ': ' + message;

    chatbox.appendChild(messageElement);

    if (chatbox.scrollHeight > chatbox.clientHeight) {
        chatbox.removeChild(chatbox.children[0])
    }
}

function handleKeyPress(event) {
// Keycode 13 is the Enter key
if (event.keyCode === 13) {
    sendMessage();
    }
}

document.addEventListener('keydown', handleKeyPress);
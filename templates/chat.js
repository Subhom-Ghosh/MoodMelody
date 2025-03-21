document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    let userInputField = document.getElementById("user-input");
    let userInput = userInputField.value.trim();
    if (userInput === "") return;

    let chatBox = document.getElementById("chat-box");

    // Display user message
    let userMessage = document.createElement("div");
    userMessage.className = "message user-msg";
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);

    // Trigger Abir Effect
    createAbirEffect(userMessage);

    userInputField.value = ""; 
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send request to backend
    fetch("http://127.0.0.1:5001/chat", {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        let botMessage = document.createElement("div");
        botMessage.className = "message bot-msg";
        botMessage.textContent = data.response;
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;

        // Trigger Abir Effect
        createAbirEffect(botMessage);
    })
    .catch(error => {
        console.error("Error:", error);
        let errorMessage = document.createElement("div");
        errorMessage.className = "message bot-msg";
        errorMessage.textContent = "⚠️ Error: Could not connect to chatbot.";
        chatBox.appendChild(errorMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

function createAbirEffect(element) {
    for (let i = 0; i < 10; i++) {
        let abir = document.createElement("div");
        abir.className = "abir";

        let rect = element.getBoundingClientRect();
        abir.style.left = rect.left + rect.width / 2 + "px";
        abir.style.top = rect.top + rect.height / 2 + "px";

        // Random Colors for Holi
        let colors = ["red", "blue", "green", "yellow", "purple", "pink"];
        abir.style.background = colors[Math.floor(Math.random() * colors.length)];

        abir.style.setProperty("--x", Math.random());
        abir.style.setProperty("--y", Math.random());

        document.body.appendChild(abir);
        setTimeout(() => abir.remove(), 1500);
    }
}

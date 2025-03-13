
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

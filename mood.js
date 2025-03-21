function analyzeMood() {
    let text = document.getElementById("textInput").value;
  
    fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById(
          "result"
        ).innerHTML = `<strong>Suggestion:</strong> ${data.suggestion}`;
  
        
        document.body.style.backgroundColor = data.color;
  
      
        document.getElementById("result").style.color = data.fontColor;
      })
      .catch((error) => console.error("Error:", error));
  }
  document.getElementById("chatme").addEventListener("click", function () {
    window.location.href = "templates/chat.html";
  });
  document.getElementById("song").addEventListener("click", function () {
    window.location.href = "song.html";
  });
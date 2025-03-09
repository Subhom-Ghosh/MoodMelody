from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)  # Allow frontend requests

# Configure Gemini API
genai.configure(api_key="AIzaSyDhB1VInwWg5DELFhjsnCepf7Llp2Y6CTo")

# Model Configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

def GenerateResponse(input_text):
    prompt = [
        "Chat naturally with the user as a psychotherapist. Engage in a conversation about their emotions and well-being in one or two line, when user tell about mood suggest some bengali and hindi song with singer's name",
        f"User Input: {input_text}",
        "Output:",
    ]
    response = model.generate_content(prompt)
    return response.text if hasattr(response, "text") else response.parts[0].text

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get("message", "").strip()

    if not user_input:
        return jsonify({"response": "Please type a message."})

    response = GenerateResponse(user_input)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True, port=5001)  # Run the Flask server

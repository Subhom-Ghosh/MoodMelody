from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)  

# Configure Gemini AI
genai.configure(api_key="AIzaSyCxYMVRBcfz36Ti6fAN8POR8XZrguWCv1Y")  # Replace with your actual API key

generation_config = {
    "temperature": 0.7,
    "top_p": 0.9,
    "top_k": 40,
    "max_output_tokens": 512,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

def generate_response(input_text):
    """Generate AI Response with Mood-Based Suggestion"""
    prompt = f"""
    You are a supportive and empathetic AI assistant. Your goal is to analyze the user's emotional tone from their input and provide a single, uplifting, and personalized activity suggestion that aligns with their current mood.
    
    User Input: "{input_text}"

    AI Suggestion:
    """
    
    response = model.generate_content(prompt)
    return response.text if hasattr(response, "text") else response.parts[0].text

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    user_input = data.get("text", "").strip()

    if not user_input:
        return jsonify({"suggestion": "Please enter some text.", "color": "#ffffff", "fontColor": "#000000"})

    response = generate_response(user_input)

    return jsonify({
        "suggestion": response,
        "color": "#ffcc00",  # Mood-based color (customize if needed)
        "fontColor": "#000000"  # Adjust font color for visibility
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)
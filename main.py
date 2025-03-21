from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)  

# Configure Gemini API
genai.configure(api_key="AIzaSyDhB1VInwWg5DELFhjsnCepf7Llp2Y6CTo")

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
    """Generate AI Response with Mood Detection & Playful Interaction"""
    prompt = f"""
    Act as a supportive, empathetic, and engaging friend. 
    Your response should be warm, personalized, and context-aware. 
    Follow these guidelines:

    1. **Greetings Handling:**
       - If the user greets (e.g., "Hi", "Hello"), respond with warmth and enthusiasm.

    2. **General Thoughts & Conversations:**
       - If the user shares a general thought or opinion, acknowledge it in a friendly and conversational manner.

    3. **Mood-Based Response:**
       - If a specific emotion or mood is detected in the input, respond accordingly:
         - Happy: Celebrate with the user.
         - Sad: Offer comfort and reassurance.
         - Angry: Acknowledge their frustration and provide a calming response.
         - Excited: Share in their enthusiasm.
         - Anxious: Offer soothing and supportive words.
        
    4. **Language Detection & Adaptation:**
    - If the user writes in English, respond in English.

       - If the input is in English letters but written in Bengali (Romanized Bengali), detect it and respond in Indian Bengali script Not bangladeshi bengali
       - If the user writes in English, respond in English.

    5. **Playful & Fun Responses:**
       - If the user is joking or teasing, respond in a fun and playful way.
       - If the user uses sarcasm, play along but keep it friendly.
       - If the user tries to be witty, match their energy with a clever or funny reply.

    User Input: {input_text}
    Response:"""
    
    response = model.generate_content(prompt)
    return response.text if hasattr(response, "text") else response.parts[0].text


@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get("message", "").strip()

    if not user_input:
        return jsonify({"response": "Please type a message."})

    response = generate_response(user_input)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True, port=5001)

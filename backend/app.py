from flask import Flask, request, jsonify

from utils.functions import get_model, summarize

import os

app = Flask(__name__)

@app.route("/")
def index():
    return "Hello World!"

@app.route('/summarize', methods=['POST'])
def summarizeText():
    input_text = request.json['text']  # get the input text from the client

    model = get_model()
    
    summary = summarize(
        input_text,
        model,
        min_sentence_length=14, 
        top_k=3, 
        batch_size=4
    )
    
    return jsonify({'summary': summary})  # return the summary as a JSON response


if __name__ == "__main__":
    
    app.run(debug=True)
    
    

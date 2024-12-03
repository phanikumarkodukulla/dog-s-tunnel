from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

# Route for the main game page
@app.route('/')
def index():
    return render_template('index.html')

# API endpoint to get the random hole for the dog
@app.route('/get_dog_position')
def get_dog_position():
    hole = random.randint(1, 8)
    return jsonify({'hole': hole})
@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)

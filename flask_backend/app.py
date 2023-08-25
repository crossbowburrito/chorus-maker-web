from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return ''

@app.route('/api/random-tempo')
def random_tempo():
    return jsonify({"tempo": random.randint(40, 200)})

@app.route('/api/random-mami')
def random_mami():
    choices = ['Major', 'Minor']
    selected_mami = random.choice(choices)
    print("Randomly selected mami:", selected_mami)
    return jsonify({"mami": selected_mami})

@app.route('/api/random-key')
def random_key():
    letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    nfs = [' ', 'b', '#']
    
    all_combinations = [letter + nf.strip() for letter in letters for nf in nfs]
    invalid_combinations = ['B#', 'Cb', 'Fb', 'E#', 'A#', 'Gb']
    valid_combinations = [combo for combo in all_combinations if combo not in invalid_combinations]
    selected_key = random.choice(valid_combinations)
    return jsonify({"key": selected_key})


@app.route('/api/random-chord-progression')
def random_chord_progression():
    mami = request.args.get('mami')
    print("Backend received mami value:", mami) 
    major_chord_progressions = [
    ['I', 'IV', 'V', 'IV'],
    ['I', 'V', 'vi', 'IV'],
    ['I', 'IV', 'V', 'IV'],
    ['ii7', 'V7', 'I7'],
    ['I', 'vi', 'IV', 'V'],
    ['I', 'V', 'vi', 'iii', 'IV', 'I', 'IV', 'V'],
    ['IV', 'V', 'iii', 'vi'],
    ['I', 'bVII', 'I']
]

    minor_chord_progressions = [
        ['i', 'iv', 'v', 'i'],
        ['i', 'ii˚', 'v', 'i'],
        ['i', 'bVI', 'bIII', 'bVII'],
        ['i', 'bVII', 'bVI', 'bVII', 'i'],
        ['i', 'bVII', 'bVI', 'V7']
    ]
    if mami == 'Major':
        selected_progression = random.choice(major_chord_progressions)
    elif mami == 'Minor':
        selected_progression = random.choice(minor_chord_progressions)
    else:
        return jsonify({"error": "Invalid mami value"}), 400

    return jsonify({"progression": selected_progression})


@app.route('/api/random-time-signature')

def random_time_signature():
    return jsonify({"time_signature": random.choice(["3/4", "4/4"])})

if __name__ == '__main__':
    app.run(debug=True)

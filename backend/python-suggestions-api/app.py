from flask import Flask, request, jsonify
from suggestions import generate_suggestions

app = Flask(__name__)

@app.route('/suggest', methods=['POST'])
def suggest():
    try:
        expense_data = request.json.get('expenses', [])
        suggestions = generate_suggestions(expense_data)
        return jsonify({ "suggestions": suggestions })
    except Exception as e:
        return jsonify({ "error": str(e) }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

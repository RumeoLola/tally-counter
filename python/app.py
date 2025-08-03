from flask import Flask, render_template, request, redirect, session, url_for
from flask_session import Session

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)


def init_counter():
    return {'title': '', 'value': 0, 'reset_message': False}


@app.route('/')
def index():
    if 'counters' not in session:
        session['counters'] = []
    return render_template('index.html', counters=session['counters'])


@app.route('/add')
def add_counter():
    counters = session.get('counters', [])
    counters.append(init_counter())
    session['counters'] = counters
    return redirect(url_for('index'))


@app.route('/update/<int:index>', methods=['POST'])
def update_counter(index):
    counters = session.get('counters', [])
    if 0 <= index < len(counters):
        action = request.form.get('action')
        title = request.form.get('title')
        counter = counters[index]
        counter['title'] = title
        if action == 'increment':
            counter['value'] += 1
            counter['reset_message'] = False
        elif action == 'decrement':
            if counter['value'] > 0:  # Prevent going below 0
                counter['value'] -= 1
            counter['reset_message'] = False
        elif action == 'reset':
            counter['value'] = 0
            counter['reset_message'] = True
    session['counters'] = counters
    return redirect(url_for('index'))


@app.route('/remove/<int:index>', methods=['POST'])
def remove_counter(index):
    counters = session.get('counters', [])
    if 0 <= index < len(counters):
        counters.pop(index)
    session['counters'] = counters
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)

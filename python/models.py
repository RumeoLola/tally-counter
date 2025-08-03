from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Counter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=True)
    count = db.Column(db.Integer, default=0)

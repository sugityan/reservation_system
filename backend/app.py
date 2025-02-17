from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)

# データベースの設定
app.config['SQLALCHEMY_DATABASE_URL'] = 'postgresql://root:secret@localhost:5432/mydb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Reservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    party_size = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'date': self.date.strftime('%Y-%m-%d'),
            'time': self.time.strftime('%H:%M'),
            'party_size': self.party_size
        }

@app.route('/api/reservations', methods=['POST'])
def create_reservation():
    data = request.get_json()
    reservation = Reservation(
        name=data['name'],
        email=data['email'],
        phone=data['phone'],
        date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
        time=datetime.strptime(data['time'], '%H:%M').time(),
        party_size=data['party_size']
    )
    db.session.add(reservation)
    db.session.commit()
    return jsonify(reservation.to_dict()), 201


@app.route('/api/reservations', methods=['GET'])
def get_reservations():
    reservations = Reservation.query.all()
    return jsonify([reservation.to_dict() for reservation in reservations])

@app.route('/api/reservations/<int:id>', methods=['GET'])
def get_reservation(id):
    reservation = Reservation.query.get_or_404(id)
    return jsonify(reservation.to_dict())

@app.route('/api/reservations/<int:id>', methods=['PUT'])
def update_reservation(id):
    data = request.get_json()
    reservation = Reservation.query.get_or_404(id)
    reservation.name = data['name']
    reservation.email = data['email']
    reservation.phone = data['phone']
    reservation.date = datetime.strptime(data['date'], '%Y-%m-%d').date()
    reservation.time = datetime.strptime(data['time'], '%H:%M').time()
    reservation.party_size = data['party_size']
    db.session.commit()
    return jsonify(reservation.to_dict())

@app.route('/api/reservations/<int:id>', methods=['DELETE'])
def delete_reservation(id):
    reservation = Reservation.query.get_or_404(id)
    db.session.delete(reservation)
    db.session.commit()
    return jsonify({"message": "Reservation deleted successfully"})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5001)
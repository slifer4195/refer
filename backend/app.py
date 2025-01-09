from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///emails.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Email configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'slifer4195@gmail.com'
app.config['MAIL_PASSWORD'] = 'anda cjtn ocui jvzo'  # Replace with your Gmail app password
app.config['MAIL_DEFAULT_SENDER'] = 'slifer4195@gmail.com'

mail = Mail(app)

# Define the Email model for SQLAlchemy (Only once)
class Email(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email_address = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<Email {self.email_address}>'

# Route to send email
@app.route('/send_email', methods=['GET'])
def send_email():
    email = request.args.get('email')
    if not email:
        return 'Email address is required.', 400

    try:
        msg = Message(
            'Hello from Flask!',
            recipients=[email]
        )
        msg.body = 'This is a test email sent from Flask.'
        mail.send(msg)
        return f'Email sent successfully to {email}!'
    except Exception as e:
        return f'Failed to send email: {e}', 500

# Route to get all email addresses
@app.route('/emails', methods=['GET'])
def get_emails():
    emails = Email.query.all()
    email_list = [{"id": email.id, "email_address": email.email_address} for email in emails]
    return jsonify(email_list)

# Route to add a new email
@app.route('/emails', methods=['POST'])
def add_email():
    data = request.get_json()
    email = data.get('email_address')
    if not email:
        return jsonify({"error": "Email address is required"}), 400

    if Email.query.filter_by(email_address=email).first():  # Avoid duplicates
        return jsonify({"error": "Email address already exists"}), 400

    new_email = Email(email_address=email)
    db.session.add(new_email)
    db.session.commit()
    return jsonify({"id": new_email.id, "email_address": new_email.email_address}), 201

# Route to delete an email by ID
@app.route('/emails/<int:id>', methods=['DELETE'])
def delete_email(id):
    email_to_delete = Email.query.get_or_404(id)
    db.session.delete(email_to_delete)
    db.session.commit()
    return jsonify({"message": "Email deleted successfully"}), 200

if __name__ == '__main__':
    # Check if the database file exists
    if not os.path.exists('emails.db'):
        print("creating database")
        with app.app_context():
            db.create_all()  # Create the database tables if they do not exist
    app.run(debug=True)

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from hci.routes import authentication_routes

import os

# Load environment variables
load_dotenv()
mysql_user = os.environ['MYSQL_USER']
mysql_password = os.environ['MYSQL_PASSWORD']
mysql_host = os.environ['MYSQL_HOST']
mysql_port = os.environ['MYSQL_PORT']
mysql_database = os.environ['MYSQL_DATABASE']

# Create and configure app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+mysqlconnector://{mysql_user}:{mysql_password}@{mysql_host}:{mysql_port}/{mysql_database}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = 'v5t8IIbv7c8xw59sqoQInUHEouXqVLSHrvw0Ggk00_BiBNSBXH--qU_tiwGER8uf_-vsOdh6Pjwf2vYL1I_U7-rdFYvZ-C2C6sYokT6HGww-WaH97BGrRKHcUmt0kFb-sJRfAFik5-QPERSXEdmCya4uvRRVxX8bI2126dbM20A'
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

# Register blueprints
app.register_blueprint(authentication_routes)

# Import and initialize database from models module
from hci.models import db
db.init_app(app)

if __name__ == '__main__':
    app.run()

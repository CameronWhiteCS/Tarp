from flask import Flask, make_response, Blueprint
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
import os

# Load environment variables from the .env file
load_dotenv()

# Create Flask / uWSGI app
app = Flask(__name__)
db = SQLAlchemy(app)


from hci.models import User

# Configure the app
mysql_user = os.environ['MYSQL_USER']
mysql_password = os.environ['MYSQL_PASSWORD']
mysql_host = os.environ['MYSQL_HOST']
mysql_port = os.environ['MYSQL_PORT']
mysql_database = os.environ['MYSQL_DATABASE']

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+mysqlconnector://{mysql_user}:{mysql_password}@{mysql_host}:{mysql_port}/{mysql_database}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = 'v5t8IIbv7c8xw59sqoQInUHEouXqVLSHrvw0Ggk00_BiBNSBXH--qU_tiwGER8uf_-vsOdh6Pjwf2vYL1I_U7-rdFYvZ-C2C6sYokT6HGww-WaH97BGrRKHcUmt0kFb-sJRfAFik5-QPERSXEdmCya4uvRRVxX8bI2126dbM20A'
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

try:
    db.create_all()
except:
    print('Failed to initialize database.')


@app.route('/')
def route_index():
    return make_response('Hello, world!')

if __name__ == '__main__':
    app.run()

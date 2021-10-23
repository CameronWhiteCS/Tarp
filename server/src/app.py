from dotenv import load_dotenv
load_dotenv()

from hci.globals import app, db
from hci.models import *
from hci.routes import *

db.create_all()

if __name__ == '__main__':
    app.run()

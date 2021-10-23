#!/bin/bash

# This script creates a python virtual environment,
# activates the environment, installs any necessary dependencies,
# and then starts the flask server on port 5000

export PROJECT_ROOT=$HOME/HCIProject/
export SERVER_ROOT=$PROJECT_ROOT/server/
export PYTHONHOME=$HOME/HCIProject/server/src:$HOME/HCIProject/server/env/lib/python3.8/site-packages
export FLASK_APP=$HOME/HCIProject/server/src/app.py
export FLASK_ENV=development

python3 -m venv $SERVER_ROOT/env
source $SERVER_ROOT/env/bin/activate
pip3 install -r $SERVER_ROOT/requirements.txt
flask run -p $FLASK_PORT

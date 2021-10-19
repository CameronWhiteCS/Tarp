#!/bin/bash

# This script creates a python virtual environment,
# installs any necessary scripts to that environment,
# and then activates the environment.  

export PROJECT_ROOT=$HOME/HCIProject/
export SERVER_ROOT=$PROJECT_ROOT/server/

python3 -m venv $SERVER_ROOT/env
source $SERVER_ROOT/env/bin/activate
pip3 install -r $SERVER_ROOT/requirements.txt
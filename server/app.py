from flask import Flask, make_response

app = Flask(__name__)

@app.route('/')
def route_index():
    return make_response('Hello, world!')

if __name__ == '__main__':
    app.run()

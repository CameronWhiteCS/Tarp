from flask import make_response

def error(message, code=400):
    '''
        Standard error function used to
        give the client a consistent error
        format. Should be used whenever an error
        is intentionally returned by the server. 
    '''
    return make_response(message, code)
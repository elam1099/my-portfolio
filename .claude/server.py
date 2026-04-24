import sys
sys.path = [p for p in sys.path if p != '']

from http.server import HTTPServer, SimpleHTTPRequestHandler

DIRECTORY = '/Users/emilylam/Desktop/my-portfolio'

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        pass  # suppress request logs

HTTPServer(('', 3000), Handler).serve_forever()

#!/usr/bin/env python3

# This file needs to be ran from TF_NumberClassifier path

from http.server import HTTPServer, SimpleHTTPRequestHandler, test
import sys

# Using CORS permission to download the model from the server

class CORSRequestHandler (SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        SimpleHTTPRequestHandler.end_headers(self)

if __name__ == '__main__':
    test(CORSRequestHandler, HTTPServer, port=int(
        sys.argv[1]) if len(sys.argv) > 1 else 8000)
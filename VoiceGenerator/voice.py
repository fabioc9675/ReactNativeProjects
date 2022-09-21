"""
Reproducir sonido a partir de texto con Python
https://parzibyte.me/blog
"""

from flask import Flask, request
import pyttsx3

NUMBER_OF_TIMES_REPEAT_AUDIO = 2

app = Flask(__name__)


@app.route("/")
def play_sound():
    text = request.args.get("text")
    if not text:
        return ""
    else:
        engine = pyttsx3.init()
        engine.setProperty("rate", 150)
        for _ in range(NUMBER_OF_TIMES_REPEAT_AUDIO):
            engine.say(text)
            engine.runAndWait()
        return ""


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=True)

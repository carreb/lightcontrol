from numpy import power
import requests
from flask import Flask, jsonify
import json
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
token = "c00382a333bc0e8410aee7a7ae99d569aaed8be0a45680d160e3d1eba5a38d73"
powerStatus = "unknown"
brightnessStatus = "unknown"
colorStatus = "unknown"
headers = {
    "Authorization": "Bearer %s" % token,
}


@app.route('/statusnew')
def getstatus():
    global powerStatus
    global brightnessStatus
    return json.dumps({"power": powerStatus, "brightness": brightnessStatus, "color": "#" + colorStatus})

@app.route('/powertoggle')
def powertoggle():
    status = requests.get("https://api.lifx.com/v1/lights/d073d53a25b7/", headers=headers)
    global powerStatus
    statusJsonObj = json.loads(status.text)
    if statusJsonObj[0]["power"] == "on":
        powerStatus = "off"
        payload = {
            "power": "off",
        }
    else:
        powerStatus = "on"
        payload = {
            "power": "on",
        }
    
    response = requests.put(
        'https://api.lifx.com/v1/lights/all/state', data=payload, headers=headers)
    requests.get("http://127.0.0.1:5001/powerButtonCooldown")
    return(response.json())
@app.route('/brightness/<int:brightness>')
def brightness(brightness):
    global brightnessStatus
    global powerStatus
    powerStatus = "on"
    brightnessStatus = brightness
    payload = {
        "power": "on",
        "brightness": brightness / 100,
    }
    response = requests.put('https://api.lifx.com/v1/lights/all/state', data=payload, headers=headers)
    requests.get("http://127.0.0.1:5001/brightnessSliderCooldown")
    return(response.json())

@app.route('/color/<hexcode>')
def setcolor(hexcode):
    global powerStatus
    global colorStatus
    powerStatus = "on"
    colorStatus = hexcode
    payload = {
        "power": "on",
        "color": hexcode,
        "brightness": brightnessStatus / 100,
    }
    response = requests.put('https://api.lifx.com/v1/lights/all/state', data=payload, headers=headers)
    requests.get("http://127.0.0.1:5001/colorChangeCooldown")
    return(response.json())

app.run(debug=True)
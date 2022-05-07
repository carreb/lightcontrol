import requests
from flask import Flask, jsonify, request
from threading import Thread
import time
import asyncio
import json
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
pwrCooldown = 0
pwrCooldownTime = 0
brtCooldownTime = 0
colorCooldown = 0
colorCooldownTime = 0


@app.route('/powerButtonCooldown')
def powerButtonCooldown():
    global pwrCooldown
    global pwrCooldownTime
    pwrCooldown = 80
    pwrCooldownTime = time.time()
    return json.dumps({"response": "OK"})

@app.route('/brightnessSliderCooldown')
def brightnessSliderCooldown():
    global brtCooldown
    global brtCooldownTime
    brtCooldown = 60
    brtCooldownTime = time.time()
    return json.dumps({"response": "OK"})

@app.route('/colorChangeCooldown')
def colorChangeCooldown():
    global colorCooldown
    global colorCooldownTime
    colorCooldown = 60
    colorCooldownTime = time.time()
    return json.dumps({"response": "OK"})

@app.route('/getAllCooldowns')
def getAllCooldowns():
    global pwrCooldown
    global pwrCooldownTime
    pwrAmtToSubtract = time.time() - pwrCooldownTime
    pwrCooldown = 80 - pwrAmtToSubtract
    pwrCooldown = int(pwrCooldown)
    global brtCooldown
    global brtCooldownTime
    brtAmtToSubtract = time.time() - brtCooldownTime
    brtCooldown = 60 - brtAmtToSubtract
    brtCooldown = int(brtCooldown)
    global colorCooldown
    global colorCooldownTime
    colorAmtToSubtract = time.time() - colorCooldownTime
    colorCooldown = 60 - colorAmtToSubtract
    colorCooldown = int(colorCooldown)
    if brtCooldown < 0:
        brtCooldown = 0
    if pwrCooldown < 0:
        pwrCooldown = 0 
    if colorCooldown < 0:
        colorCooldown = 0
    return json.dumps({"cooldownPowerButton": pwrCooldown, "cooldownBrightnessSlider": brtCooldown, "cooldownColorChange": colorCooldown})



app.run()
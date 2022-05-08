const powerbutton = document.getElementById('powerbutton');
const brightnessSlider = document.getElementById('brightnessSlider');
const colorbutton = document.getElementById('colorbutton');
const color = document.getElementById('color');
const middleman = "https://sour-nights-enjoy-99-252-144-103.loca.lt"
const siteinfo = "https://dull-cars-check-99-252-144-103.loca.lt"
var brightness = 0;
powerbutton.disabled = true;
brightnessSlider.disabled = true;
colorbutton.disabled = true;

function testConnection() {
    fetch(middleman + "/statusnew")
    .then(response => response.json())
    if (response.status === 200) {
        document.getElementById('connectToMiddleman').innerHTML = "Connected to middleman";
    }
    fetch(siteinfo + "/getAllCooldowns")
    .then(response => response.json())
    if (response.status === 200) {
        document.getElementById('connectToSiteInfo').innerHTML = "Connected to siteinfo";
    }
}

// Get status every second

const interval = setInterval(function() {
    getStatus();
    getCooldowns();
}, 1000);

// Interprets the data from the server and updates the UI
function getStatus() {
    fetch(middleman + "/statusnew")
    .then(response => response.json())
    .then(data => {
        if (data.power === "on") {
            // If the light is on, make the button red and say power off
            if (!powerbutton.disabled) {
                powerbutton.innerHTML = "Power Off";
            }
            powerbutton.classList.add("redbutton");
            powerbutton.classList.remove("greenbutton");
        } else {
            // If the light is off, make the button green and say power on
            if (!powerbutton.disabled) {
                powerbutton.innerHTML = "Power On";
            }
            powerbutton.classList.add("greenbutton");
            powerbutton.classList.remove("redbutton");
        }
        // Updates the brightness slider's value and label with the current brightness of the light.
        brightnessSlider.value = data.brightness;
        if (!brightnessSlider.disabled) {
          document.getElementById("brightnessLabel").innerHTML = "Brightness (" + data.brightness + "%)";
        }
        // Updates the color button's background color to the current color of the light.
        colorbutton.style.backgroundColor = data.color
    });
}

function getCooldowns() {
    fetch(siteinfo + "/getAllCooldowns")
    // Gets the current cooldowns from the server
    .then(response => response.json())
    .then(data => {
        if (data.cooldownPowerButton > 0) {
            // If the power button is on cooldown, disables the button and sets the label to the cooldown time
            powerbutton.innerHTML = "On Cooldown For " + data.cooldownPowerButton + " Seconds";
            powerbutton.disabled = true;
            if (!powerbutton.classList.contains("disabled")) {
                powerbutton.classList.add("disabled")
            }
        } else {
            // Re-enables the button
            powerbutton.disabled = false;
            powerbutton.classList.remove("disabled")
        }
        if (data.cooldownBrightnessSlider > 0) {
            // If the brightness slider is on cooldown, disables the slider and appends the cooldown time to the label
            brightnessSlider.disabled = true;
            document.getElementById("brightnessLabel").innerHTML = "Brightness (" + brightnessSlider.value + "%) [On Cooldown For " + data.cooldownBrightnessSlider + " Seconds]";
            if (!brightnessSlider.classList.contains("disabled")) {
                brightnessSlider.classList.add("disabled");
            }
        } else {
            // Re-enables the slider
            brightnessSlider.disabled = false;
            brightnessSlider.classList.remove("disabled");
        }
        if (data.cooldownColorChange > 0) {
            // If the color button is on cooldown, disables the button and sets the label to the cooldown time
            colorbutton.innerHTML = "On Cooldown For " + data.cooldownColorChange + " Seconds";
            colorbutton.disabled = true;
            if (!colorbutton.classList.contains("disabled")) {
                colorbutton.classList.add("disabled")
            }
        } else {
            // Re-enables the button
            colorbutton.disabled = false;
            colorbutton.classList.remove("disabled")
            colorbutton.innerHTML = "Change Color";
        }
    });
}

// Event listeners for each input method

powerbutton.onclick = () => {
    fetch(middleman + "/powertoggle")
    .then(response => response.json())
    .then(data => {
        console.log(data)
    });
}

brightnessSlider.onchange = function() {
    brightness = this.value;
    fetch(middleman + "/brightness/" + brightness)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    });
}

colorbutton.onclick = () => {
    if (color.value !== "#000000") {
        colorvalue = color.value.substring(1);
        fetch(middleman + "/color/" + colorvalue)
        .then(response => response.json())
        .then(data => {
            console.log(data)
    });
    }
}

color.onchange = function() {
    if (this.value === "#000000") {
        color.value = "#8cb2e1"
    }
}

// Start
getStatus();
testConnection();
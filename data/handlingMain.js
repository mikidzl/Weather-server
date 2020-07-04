var deltaT = 160;

loadFile();
setInterval(loadFile, timer(deltaT));


function timer(time) {
    return (180 - time) * 1000;
}

// function reloadLoop{
//     // if(!document.hidden)
//         loadFile();
// }

// document.addEventListener("visibilitychange", function() {
//     document.title = document.hidden ? "I'm away" : "I'm here";
// }

function loadFile() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            parseFile(this.responseText);
        }
    };
    xmlhttp.open("GET", "temp.txt", true);
    xmlhttp.send();
}

function parseFile(string) {
    var data = string.split(",", 4);

    isSensorConnected(data[0]);
    var date = new Date(parseInt(data[0]) * 1000);
    var time = String(appendLeadingZeroes(date.getHours()) + ":") + String(appendLeadingZeroes(date.getMinutes()) + ":") + String(appendLeadingZeroes(date.getSeconds()));          //formating time to HH:mm:ss

    document.getElementById("time").textContent = time;
    document.getElementById("temperature").textContent = data[1];
    document.getElementById("pressure").textContent = data[2];
    document.getElementById("humidity").textContent = data[3];
}

function appendLeadingZeroes(n) {
    if (n <= 9) {
        return "0" + n;
    }
    return n
}

function isSensorConnected(lastMeasurment) {
    var timeNow = new Date();
    timeNow = timeNow.valueOf() / 1000;
    deltaT = timeNow - lastMeasurment;
    if (deltaT > 30)
        document.getElementById("connected").style.visibility = "visible";
    else
        document.getElementById("connected").style.visibility = "hidden";
}
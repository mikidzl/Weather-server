
loadFile();

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

    var date = new Date(parseInt(data[0]) * 1000);
    var time = String(date.getHours() + ":") + String(date.getMinutes() + ":") + String(date.getSeconds());
    document.getElementById("time").textContent = time;
    document.getElementById("temperature").textContent = data[1];
    document.getElementById("pressure").textContent = data[2];
    document.getElementById("humidity").textContent = data[3];
}
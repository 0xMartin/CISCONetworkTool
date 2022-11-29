

/******************************************************************************************* */
// variables
/******************************************************************************************* */

const cmd_list = document.querySelector("#cmd_list");
const interface = document.querySelector("#interface");
const ip = document.querySelector("#ip");
const mask = document.querySelector("#mask");

const canvas = document.querySelector("#canvas");


/******************************************************************************************* */
// events
/******************************************************************************************* */

function generate() {
    // commands
    cmd_list.innerHTML = "";
    var inverse = 32 - parseInt(mask.value);
    var network_ip = IPToInt(ip.value) >> inverse;
    network_ip = network_ip << inverse;
    ip.value = intToIP(network_ip);
    insertCommandToUL(cmd_list, "ip route " + ip.value + " " + CIDR2netmask(parseInt(mask.value)) + " " + interface.value);


    // paint schematic
    const ctx = canvas.getContext("2d");
    var img = new Image;
    img.src = "../res/static_routing.png";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("aa");
    img.addEventListener("load", (e) => {
        ctx.drawImage(img, (canvas.width - img.width) / 2, (canvas.height - img.height)/2, img.width , img.height );

        ctx.font = '24px serif';
        ctx.fillStyle = "#000";
        ctx.fillText(interface.value, 232, 55);
        ctx.fillStyle = "#f00";
        ctx.fillText(ip.value + "/" + mask.value, 350, 115);
    });
}
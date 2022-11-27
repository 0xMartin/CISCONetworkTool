

/******************************************************************************************* */
// variables
/******************************************************************************************* */

const cmd_list = document.querySelector("#cmd_list");
const interface = document.querySelector("#interface");
const ip = document.querySelector("#ip");
const mask = document.querySelector("#mask");

/******************************************************************************************* */
// events
/******************************************************************************************* */

function generate() {
    cmd_list.innerHTML = "";

    var inverse = 32 - parseInt(mask.value);
    var network_ip = IPToInt(ip.value) >> inverse;
    network_ip = network_ip << inverse;
    ip.value = intToIP(network_ip);
    
    insertCommandToUL(cmd_list, "ip route " + ip.value + " " + CIDR2netmask(parseInt(mask.value)) + " " + interface.value);
}
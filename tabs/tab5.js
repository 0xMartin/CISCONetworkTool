

/******************************************************************************************* */
// variables
/******************************************************************************************* */

const pool = document.querySelector("#pool");
const gateway = document.querySelector("#gateway");
const ip = document.querySelector("#ip");
const mask = document.querySelector("#mask");
const dns = document.querySelector("#dns");
const domain = document.querySelector("#domain");

/******************************************************************************************* */
// events
/******************************************************************************************* */

function generate() {
    cmd_list.innerHTML = "";
    insertCommandToUL(cmd_list, "ip dhcp excluded-address " + gateway.value);
    insertCommandToUL(cmd_list, "ip dhcp pool " + pool.value);
    insertCommandToUL(cmd_list, "default-router " + gateway.value);

    var inverse = 32 - parseInt(mask.value);
    var network_ip = IPToInt(ip.value) >> inverse;
    network_ip = network_ip << inverse;
    ip.value = intToIP(network_ip);

    insertCommandToUL(cmd_list, "network  " + ip.value + " " + CIDR2netmask(parseInt(mask.value)));
    insertCommandToUL(cmd_list, "domain-name " + domain.value);
    insertCommandToUL(cmd_list, "dns-server " + dns.value);
    insertCommandToUL(cmd_list, "exit");
    insertCommandToUL(cmd_list, "service dhcp");
}
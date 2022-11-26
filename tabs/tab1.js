

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
    insertCommandToUL(cmd_list, "interface " + interface.value);
    insertCommandToUL(cmd_list, "ip address " + ip.value + " " + CIDR2netmask(parseInt(mask.value)));
    insertCommandToUL(cmd_list, "no shutdown")
    insertCommandToUL(cmd_list, "exit")
}
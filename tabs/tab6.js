

/******************************************************************************************* */
// variables
/******************************************************************************************* */

const ports = document.querySelector("#ports");
const vlan = document.querySelector("#vlan");
const cmd_list = document.querySelector("#cmd_list");


const port = document.querySelector("#port");
const cmd_list_2 = document.querySelector("#cmd_list_2");

/******************************************************************************************* */
// events
/******************************************************************************************* */

function generatePorts() {
    cmd_list.innerHTML = "";
    if (ports.value.includes("-")) {
        insertCommandToUL(cmd_list, "interface range " + ports.value);
    } else {
        insertCommandToUL(cmd_list, "interface " + ports.value);
    }
    insertCommandToUL(cmd_list, "switchport mode access");
    insertCommandToUL(cmd_list, "switchport access vlan " + vlan.value);
    insertCommandToUL(cmd_list, "exit");
}

function generateTrunk() {
    cmd_list_2.innerHTML = "";
    insertCommandToUL(cmd_list_2, "interface " + port.value);
    insertCommandToUL(cmd_list_2, "shutdown");
    insertCommandToUL(cmd_list_2, "switchport mode trunk");
    insertCommandToUL(cmd_list_2, "no shutdown");
    insertCommandToUL(cmd_list_2, "exit");
}
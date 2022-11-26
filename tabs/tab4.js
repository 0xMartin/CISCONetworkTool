

/******************************************************************************************* */
// variables
/******************************************************************************************* */

const cmd_list = document.querySelector("#cmd_list");
const ip_list = document.querySelector("#ip_list");

/******************************************************************************************* */
// events
/******************************************************************************************* */

function generate() {
    cmd_list.innerHTML = "";
    insertCommandToUL(cmd_list, "router rip");
    insertCommandToUL(cmd_list, "version 2");
    var ips = ip_list.value.split(",");
    ips.forEach((ip) => {
        if(ip.length >= 8) { 
            insertCommandToUL(cmd_list, "network " + ip.trim());
        }
    });
    insertCommandToUL(cmd_list, "no auto-summary")
    insertCommandToUL(cmd_list, "exit")
}
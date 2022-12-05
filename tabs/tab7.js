

/******************************************************************************************* */
// variables
/******************************************************************************************* */

const acl_num = document.querySelector("#acl_num");
const subnet = document.querySelector("#subnet");
const mask = document.querySelector("#mask");
const cmd_list = document.querySelector("#cmd_list");

const acl_num_2 = document.querySelector("#acl_num_2");
const subnet_2 = document.querySelector("#subnet_2");
const mask_2 = document.querySelector("#mask_2");
const host_2 = document.querySelector("#host_2");
const cmd_list_2 = document.querySelector("#cmd_list_2");

/******************************************************************************************* */
// events
/******************************************************************************************* */

function generate1() {
    cmd_list.innerHTML = "";

    var wm = "";
    CIDR2netmask(mask.value).split(".").forEach(num => {
        wm += (255 - num) + ".";  
    });
    wm = wm.substring(0, wm.length -1);

    insertCommandToUL(cmd_list, "access-list " + acl_num.value + " permit " + subnet.value + " " + wm);
    insertCommandToUL(cmd_list, "access-list " + acl_num.value + " deny any");
}

function generate2() {
    cmd_list.innerHTML = "";

    var wm = "";
    CIDR2netmask(mask.value).split(".").forEach(num => {
        wm += (255 - num) + ".";  
    });
    wm = wm.substring(0, wm.length -1);

    insertCommandToUL(cmd_list, "access-list " + acl_num.value + " deny " + subnet.value + " " + wm);
    insertCommandToUL(cmd_list, "access-list " + acl_num.value + " permit any");
}

function generate3() {
    cmd_list_2.innerHTML = "";

    var wm = "";
    CIDR2netmask(mask_2.value).split(".").forEach(num => {
        wm += (255 - num) + ".";  
    });
    wm = wm.substring(0, wm.length -1);

    insertCommandToUL(cmd_list_2, "ip access-list extended " + acl_num_2.value);
    insertCommandToUL(cmd_list_2, "deny ip " + subnet_2.value + " " + wm + " host " + host_2.value);
    insertCommandToUL(cmd_list_2, "permit ip any any");
    insertCommandToUL(cmd_list_2, "exit");
}

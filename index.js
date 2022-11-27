/******************************************************************************************* */
// variables
/******************************************************************************************* */

// sekce 1
const mask_output_1 = document.querySelector("#mask_output_1");
const mask_prefix_length_1 = document.querySelector("#mask_prefix_length_1");

// sekce 2
const mask_2 = document.querySelector("#mask_2");
const mask_prefix_length_2 = document.querySelector("#mask_prefix_length_2");

// sekce 3
const ip_3 = document.querySelector("#ip_3");
const mask_prefix_length_3 = document.querySelector("#mask_prefix_length_3");
const ip_list_3 = document.querySelector("#ip_list_3");
const device_count_3 = document.querySelector("#device_count_3");

/******************************************************************************************* */
// events
/******************************************************************************************* */

function calculate_1() {
    mask_output_1.innerHTML = CIDR2netmask(mask_prefix_length_1.value);
}

function calculate_2() {
    var l = netmask2CIDR(mask_2.value);
    if (l == -1) {
        mask_prefix_length_2.innerHTML = "<span class='text-danger'>Neplatná</span>";
    } else {
        mask_prefix_length_2.innerHTML = l;
    }
}

function calculate_3() {
    var inverse = 32 - parseInt(mask_prefix_length_3.value);
    var network_ip = IPToInt(ip_3.value) >> inverse;
    network_ip = network_ip << inverse;
    ip_3.value = intToIP(network_ip);

    if (inverse <= 1) {
        device_count_3.innerHTML = "Neplatná síť"
    } else {
        device_count_3.innerHTML = "Počet zařízení: " + (Math.pow(2, inverse) - 2);
    }

    var d_ip = network_ip;
    var end = Math.pow(2, inverse);
    ip_list_3.innerHTML = "";
    for (var i = 0; i < end; i++) {
        var li = document.createElement("li");
        if (i == 0) {
            li.classList = "list-group-item text-success fw-bold";
            li.innerHTML = "Adresa sítě: " + intToIP(d_ip);
        } else if (i + 1 == end) {
            li.classList = "list-group-item text-danger fw-bold";
            li.innerHTML = "Broadcast: " + intToIP(d_ip);
        } else {
            li.classList = "list-group-item";
            li.innerHTML = intToIP(d_ip);
        }
        ip_list_3.appendChild(li);
        d_ip++;
    }
}

/******************************************************************************************* */
// run
/******************************************************************************************* */

calculate_1();
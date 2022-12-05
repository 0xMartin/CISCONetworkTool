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
const mask_prefix_length_3 = document.querySelector("#mask_prefix_length_3");
const mask_output_3 = document.querySelector("#mask_output_3");

// sekce 4
const ip_4 = document.querySelector("#ip_4");
const mask_prefix_length_4 = document.querySelector("#mask_prefix_length_4");
const ip_list_4 = document.querySelector("#ip_list_4");
const device_count_4 = document.querySelector("#device_count_4");

// sekce 5
const ip_5 = document.querySelector("#ip_5");
const mask_prefix_length_5 = document.querySelector("#mask_prefix_length_5");
const ip_list_5 = document.querySelector("#ip_list_5");
const device_count_5 = document.querySelector("#device_count_5");
const min_hosts_counts = document.querySelector("#min_hosts_counts_5");

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
    var wm = CIDR2netmask(mask_prefix_length_3.value);
    var wm_2 = "";
    wm.split(".").forEach(num => {
        wm_2 += (255 - num) + ".";
    });
    mask_output_3.innerHTML = wm_2.substring(0, wm_2.length - 1);
}

function calculate_4() {
    var inverse = 32 - parseInt(mask_prefix_length_4.value);
    var network_ip = IPToInt(ip_4.value) >> inverse;
    network_ip = network_ip << inverse;
    ip_4.value = intToIP(network_ip);

    if (inverse <= 1) {
        device_count_4.innerHTML = "Neplatná síť"
    } else {
        device_count_4.innerHTML = "Počet zařízení: " + (Math.pow(2, inverse) - 2);
    }

    var d_ip = network_ip;
    var end = Math.pow(2, inverse);
    ip_list_4.innerHTML = "";
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
        ip_list_4.appendChild(li);
        d_ip++;
    }
}

function calculate_5() {
    var inverse = 32 - parseInt(mask_prefix_length_5.value);
    var network_ip = IPToInt(ip_5.value) >> inverse;
    network_ip = network_ip << inverse;
    ip_5.value = intToIP(network_ip);

    if (inverse <= 1) {
        device_count_5.innerHTML = "Neplatná síť"
    } else {
        device_count_5.innerHTML = "Maximální počet subsítí: " + (Math.pow(2, inverse) - 2);
    }

    // clear
    ip_list_5.innerHTML = "";

    // preveda pocty hostu v s siti na maximalni moznou delku masky
    var masks = [];
    min_hosts_counts_5.value.split(",").forEach(min_host => {
        var host_length = minimalHostAddressLength(parseInt(min_host));
        if (host_length == -1 || host_length >= inverse) {
            var li = document.createElement("li");
            li.classList = "list-group-item";
            li.innerHTML = "<span class=\"text-danger\">Síť s počtem [" + min_host + "] není možná</span>";
            ip_list_5.appendChild(li);
            return;
        } else {
            masks.push(32 - host_length);
        }
    });

    // create subnets
    var masks_final = [parseInt(mask_prefix_length_5.value)];
    while (masks_final.length != masks.length) {
        // find min
        var min = 9999;
        var index = -1;
        for (var i = 0; i < masks.length; ++i) {
            if (min > masks_final[i] && validOperation(masks, masks_final, i)) {
                min = masks_final[i];
                index = i;
            }
        }
        if (index == -1 || min == 32) break;

        // divide min on subnets
        masks_final.splice(index, 1);
        masks_final.push(min + 1);
        masks_final.push(min + 1);
    }

    masks_final.sort();
    masks.sort();

    // check
    for (var i = 0; i < masks_final.length; i++) {
        if (masks[i] < masks_final[i]) {
            var li = document.createElement("li");
            li.classList = "list-group-item";
            li.innerHTML = "<span class=\"text-danger\">Toto rozdělení není možné</span>";
            ip_list_5.appendChild(li);
            return;
        }
    }

    // vypocit IP pro subsite
    var main_mask = parseInt(mask_prefix_length_5.value);
    var max_mask = Math.max(...masks_final);
    var cnt_map = new Map();
    masks_final.forEach(m => {
        var offset = 0;
        for(var i = main_mask; i <= max_mask; i++) {
            if(cnt_map.get(i) != null) {
                offset += Math.pow(2, 32 - i) * cnt_map.get(i);
            }
        }

        if(cnt_map.get(m) != null) {
            cnt_map.set(m, cnt_map.get(m) + 1)
        } else {
            cnt_map.set(m, 1);
        }

        var end = Math.pow(2, 32 - m) - 1;

        var li = document.createElement("li");
        li.classList = "list-group-item";
        li.innerHTML = "<b>IP: </b><span class=\"text-success\">" + intToIP(network_ip + offset) + "/" + m + "</span> <b>Brodcast: </b> <span class=\"text-danger\">" + intToIP(network_ip + offset + end) + "</span> <b>Hosts: </b> " + (Math.pow(2, 32 - m) - 2) + "</span>";
        ip_list_5.appendChild(li);
    });
}

function validOperation(masks, final_masks, i) {
    var target = final_masks[i];  
    var cnt = 0;
    for(var i = 0; i < masks.length; i++) {
        if(masks[i] == target) {
            cnt++;    
        }   
    }
    for(var i = 0; i < final_masks.length; i++) {
        if(final_masks[i] == target) {
            cnt--;    
        }   
    }
    return cnt != 0;
}

/******************************************************************************************* */
// run
/******************************************************************************************* */

calculate_1();
calculate_2();
calculate_3();

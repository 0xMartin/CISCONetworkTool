/**
 * Preveda delku sitoveho prefixu na masku ve formatu 255.255.255.255
 * @param {*} bitCount Pocet bitu masky (delka prefixu site)
 * @returns Maska ve formatu 255.255.255.255
 */
function CIDR2netmask(bitCount) {
    if (bitCount < 0) {
        bitCount = 0;
    }
    if (bitCount > 32) {
        bitCount = 32;
    }

    var mask = [];
    for (var i = 0; i < 4; i++) {
        var n = Math.min(bitCount, 8);
        mask.push(256 - Math.pow(2, 8 - n));
        bitCount -= n;
    }
    return mask.join('.');
}

/**
 * Preveda masku na delku sitoveho prefixu (delku masky v bitech)
 * @param {*} netmask Sitova maska 
 * @returns Delka sitoveho prefixu (masky) v bitech
 */
function netmask2CIDR(netmask){
    switch (netmask) {
        case "0.0.0.0":
            return 0;
        case "128.0.0.0":
            return 1;
        case "192.0.0.0":
            return 2;
        case "224.0.0.0":
            return 3;
        case "240.0.0.0":
            return 4;
        case "248.0.0.0":
            return 5;
        case "252.0.0.0":
            return 6;
        case "254.0.0.0":
            return 7;
        case "255.0.0.0":
            return 8;
        case "255.128.0.0":
            return 9;
        case "255.192.0.0":
            return 10;
        case "255.224.0.0":
            return 11;
        case "255.240.0.0":
            return 12;
        case "255.248.0.0":
            return 13;
        case "255.252.0.0":
            return 14;
        case "255.254.0.0":
            return 15;
        case "255.255.0.0":
            return 16;
        case "255.255.128.0":
            return 17;
        case "255.255.192.0":
            return 18;
        case "255.255.224.0":
            return 19;
        case "255.255.240.0":
            return 20;
        case "255.255.248.0":
            return 21;
        case "255.255.252.0":
            return 22;
        case "255.255.254.0":
            return 23;
        case "255.255.255.0":
            return 24;
        case "255.255.255.128":
            return 25;
        case "255.255.255.192":
            return 26;
        case "255.255.255.224":
            return 27;
        case "255.255.255.240":
            return 28;
        case "255.255.255.248":
            return 29;
        case "255.255.255.252":
            return 30;
        case "255.255.255.254":
            return 31;
        case "255.255.255.255":
            return 32;
        default:
            return -1;
    }
}

/**
 * Vypocita minimalni delku casti pro adresovani hosta
 * @param {*} hosts Minimalni pozadovany pocet hostu v siti
 */
function minimalHostAddressLength(hosts) {
    if(hosts < 0) {
        return -1;
    }
    for(var i = 1; i <= 32; ++i) {
        if(hosts <= Math.pow(2, i)) {
            return i;
        }
    }   
    return -1; 
}

/**
 * IP adresu ve string formatu (255.255.255.255) prevede na uint32
 * @param {*} ip IP
 * @returns uint32 IP adresa
 */
function IPToInt(ip) {
    var parts = ip.split(".");
    return (parseInt(parts[0]) << 24) + (parseInt(parts[1]) << 16) + (parseInt(parts[2]) << 8) + parseInt(parts[3]);
}

/**
 * IP adresu ve formatu uint32 prevede do formatu string (255.255.255.255)
 * @param {*} ip IP
 * @returns string (255.255.255.255) IP adresa
 */
function intToIP(ip) {
    var p1 = ip & 255;
    var p2 = (ip >> 8) & 255;
    var p3 = (ip >> 16) & 255;
    var p4 = (ip >> 24) & 255;
    return p4 + "." + p3 + "." + p2 + "." + p1;
}

/**
 * Vlozi jeden radek "prikaz" do elementu <ul>
 * @param {*} list reference na <ul> element
 * @param {*} str Prikaz (string)
 */
function insertCommandToUL(list, str) {
    var li = document.createElement("li");
    li.classList = "list-group-item text-secondary fst-italic";
    li.innerHTML = str;
    list.appendChild(li)
}
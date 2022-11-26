/**
 * Preveda delku sitoveho prefixu na masku ve formatu 255.255.255.255
 * @param {*} bitCount Pocet bitu masky (delka prefixu site)
 * @returns Maska ve formatu 255.255.255.255
 */
function CIDR2netmask(bitCount) {
    if(bitCount < 0) {
        bitCount = 0;
    }
    if(bitCount > 32) {
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
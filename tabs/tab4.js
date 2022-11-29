

/******************************************************************************************* */
// variables
/******************************************************************************************* */

const cmd_list = document.querySelector("#cmd_list");
const ip_list = document.querySelector("#ip_list");
const canvas = document.querySelector("#canvas");

/******************************************************************************************* */
// events
/******************************************************************************************* */
function generate() {
    // commands
    cmd_list.innerHTML = "";
    insertCommandToUL(cmd_list, "router rip");
    insertCommandToUL(cmd_list, "version 2");
    var ips = ip_list.value.split(",");
    ips.forEach((ip) => {
        if (ip.length >= 8) {
            insertCommandToUL(cmd_list, "network " + ip.trim());
        }
    });
    insertCommandToUL(cmd_list, "no auto-summary");
    insertCommandToUL(cmd_list, "exit");

    // paint schematic
    const ctx = canvas.getContext("2d");
    var img = new Image;
    img.src = "../res/router.png";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("aa");
    img.addEventListener("load", (e) => {
        // router image
        var pt = {x: 100, y: (canvas.height - img.height / 4)/2};
        pt.x += (img.width / 4) / 2;
        pt.y += (img.height / 4) / 2 - 8;

        // networks
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#FF0000";
        var offset_y = canvas.height * 0.1;
        var step_y = canvas.height * 0.8 / (ips.length - 1);
        ctx.font = '22px serif';
        for(var i = 0; i < ips.length; i++) {
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(pt.x + img.width / 4 + 50, offset_y);
            ctx.stroke();
            ctx.fillText(ips[i], pt.x + img.width / 4 + 50, offset_y + 11);
            offset_y += step_y;
        }

        // router image
        ctx.drawImage(img, 100, (canvas.height - img.height / 4)/2, img.width / 4, img.height / 4);
    });
}



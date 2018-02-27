window.onload = function() {
    var canvas = document.createElement("canvas");

    var pic = new Image(); 
    pic.crossOrigin = "Anonymous";
	pic.src = $('.img_container img').attr('src');
    pic.onload = function() {

        canvas.width = pic.width;
        canvas.height = pic.height;
        var ctx = canvas.getContext("2d");

        ctx.drawImage(pic, 0, 0);

        var c = canvas.getContext('2d');
        var color1 = c.getImageData(pic.width*0.25, pic.height*0.25, 1, 1).data;
        var color2 = c.getImageData(pic.height*0.5, pic.height*0.5, 1, 1).data;
        var color3 = c.getImageData(pic.height*0.75, pic.height*0.75, 1, 1).data;

        hexColor1 = "#"+componentToHex(color1[0])+componentToHex(color1[1])+componentToHex(color1[2]);
        hexColor2 = "#"+componentToHex(color2[0])+componentToHex(color2[1])+componentToHex(color2[2]);
        hexColor3 = "#"+componentToHex(color3[0])+componentToHex(color3[1])+componentToHex(color3[2]);

        document.body.style.background = "linear-gradient(to bottom right, "+hexColor1+","+hexColor2+","+hexColor3+") no-repeat center center fixed";
        document.body.style.height = "100%";
    }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
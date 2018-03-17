window.onload = function() {
    var canvas = document.createElement("canvas");
    var number_of_picks = 5; // number of picks on the image
    var rows = 2;
    var colors = []; // array which will be used to store extracted colors
    var height = 0;
    var current_row = 0;
    var height_offset = 0;

    var pic = new Image(); 
    pic.crossOrigin = "Anonymous";
	pic.src = $('.media').attr('src');
    pic.onload = function() {

        canvas.width = pic.width;
        canvas.height = pic.height;
        var ctx = canvas.getContext("2d");

        ctx.drawImage(pic, 0, 0);

        var c = canvas.getContext('2d');

        for(var i=1; i < number_of_picks+1; i++){

            current_row = i % (number_of_picks/rows);
            if(current_row == 0) current_row = number_of_picks/rows;

            width_offset = pic.width/(number_of_picks/rows) / 2;
            height_offset = (pic.height / rows) / 2;

            width = (pic.width * current_row / (number_of_picks/rows)) - width_offset;
            height = (pic.height * ( Math.ceil(i / (number_of_picks / rows) ) / rows)) - height_offset;

            color = c.getImageData(width, height, 1, 1).data;

            hexcolor = "#"+componentToHex(color[0])+componentToHex(color[1])+componentToHex(color[2]);
            colors.push(hexcolor);

            $(".picks").append("<div style='width:100px;height:40px;background:"+hexcolor+";margin:4px;'></div>");
            console.log(width+' X '+height);
        }

        colors = colors.join(',');
        document.body.style.background = "linear-gradient(to bottom right, "+colors+") no-repeat center center fixed";
        document.body.style.height = "100%";
    }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
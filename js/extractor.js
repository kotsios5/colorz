$(document).ready(function() {
    var picksInput = $('.form-wrapper #picks')[0];
    var rowsInput = $('.form-wrapper #rows')[0];
     
    picksInput.addEventListener("input", function(e) {
        execute(picksInput, rowsInput);
    });
    rowsInput.addEventListener("input", function(e) {
        execute(picksInput, rowsInput);
    });
});

function execute(picksInput, rowsInput) {
    $(".picks").remove();
    $("body").append('<div class="picks"></div>');

    var canvas = document.createElement("canvas");
    var number_of_picks = picksInput.value; // number of picks on the image
    var rows = rowsInput.value;
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

        for(var i = 0; i < number_of_picks; i++){
            var counter = i + 1;

            console.log(counter);

            current_row = counter % (number_of_picks/rows);
            if(current_row == 0) current_row = number_of_picks/rows;
            
            width_offset = pic.width/(number_of_picks/rows) / 2;
            height_offset = (pic.height / rows) / 2;

            width = (pic.width * current_row / (number_of_picks/rows)) - width_offset;
            height = (pic.height * ( Math.ceil(counter / (number_of_picks / rows) ) / rows)) - height_offset;

            color = c.getImageData(width, height, 1, 1).data;
            hexcolor = "#"+componentToHex(color[0])+componentToHex(color[1])+componentToHex(color[2]);
            colors.push(hexcolor);

            $(".picks").append("<div style='width:100px;height:40px;background:"+hexcolor+";margin:4px;'></div>");

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
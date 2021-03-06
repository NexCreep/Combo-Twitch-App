var prev = 0
var firstTime = true
var errorControl = false

const request = () => {
    fetch('/api')
    .then(res => res.json())
    .then(data => {
        var elementEmote = document.getElementById('responseEmote')
        var imgemote = document.getElementById('emoteimg');
        if(errorControl){
            $("#comboCont").stop(true)
            $("#comboCont").slideUp('fast', ()=>{
                $("#responseEmote").css("background-color", "transparent");
                $("#responseEmote").css("color", "unset");
            })
        }
        if (data.combo >= 10){
            $("#responseEmote").css("background-color", "rgba(37, 222, 255, 0.521)");
            $("#responseEmote").css("color", "magenta");
            $("#comboCont").slideDown('fast');
        }
        if (data.combo != prev){
            if (data.combo >= 150){
                $("#comboCont").effect("shake");
            }else if(data.combo == 0){
                $("#comboCont").stop(true)
                $("#comboCont").slideUp('fast', ()=>{
                    $("#responseEmote").css("background-color", "transparent");
                    $("#responseEmote").css("color", "unset");
                });
                
            }else{
                pulse('#emoteimg')
            }
            prev = data.combo
        }


        elementEmote.innerHTML = `${data.name} </br> <span style="font-size: 50pt;">x${data.combo}</span>`
        if (imgemote.src != data.url) {
            imgemote.src = data.url
        }
        firstTime = false
        errorControl = false
    })
    .catch(err => {
        errorControl = true
        var elementE = document.getElementById('responseEmote');
        var imgemoteE = document.getElementById('emoteimg');

        elementE.innerHTML = `<span style="color: red;"> AN ERROR OCURRED <br> ${err} </span>`
        imgemoteE.src = 'https://static-cdn.jtvnw.net/emoticons/v1/58765/3.0'
        $("#comboCont").slideDown('fast');

        
    })
}

function pulse(element) {
    $(element).animate({
        width: 250, height: 250, // sets the base height and width
    }, 90, function() {
        $(element).animate({
            width: 320, height: 320, // sets the alternative height and width
        }, 90);
    }); 
};

$(document).ready(() => {
    //document.getElementById('comboCont').style.display = 'none'
    $("#comboCont").slideUp('fast', ()=>{
        $("#responseEmote").css("background-color", "transparent");
        $("#responseEmote").css("color", "unset");
    })
    setInterval(request, 90)
})
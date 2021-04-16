var prev = 0

const request = () => {
    fetch('/api')
    .then(res => res.json())
    .then(data => {
        var element = document.getElementById('response');
        var imgemote = document.getElementById('emoteimg');
        var comboCont = document.getElementById('comboCont');

        if (data.combo < 10) {
            $("#comboCont").stop(true, true)
            $("#comboCont").slideUp('fast');
            //comboCont.style.display = 'none'
        }else if (data.combo >= 10){
            if (data.combo >= 150){
                $("#comboCont").effect("shake")
            }
            $("#comboCont").slideDown('fast');
    
        }
        if (data.combo != prev){
            pulse('#emoteimg')
            prev = data.combo
        }


        element.innerHTML = `Combo x${data.combo} </br> ${data.name}`
        if (imgemote.src != data.url) {
            imgemote.src = data.url
        }
    })
    .catch(err => {
        var elementE = document.getElementById('response');
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
    setInterval(request, 5)
})
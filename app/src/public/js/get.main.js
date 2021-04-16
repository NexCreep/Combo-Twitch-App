var prev = 0

const request = () => {
    fetch('/api')
    .then(res => res.json())
    .then(data => {
        var element = document.getElementById('response');
        var imgemote = document.getElementById('emoteimg');
        var comboCont = document.getElementById('comboCont');

        if (data.combo < 10) {
            $("#comboCont").slideUp('fast');
            //comboCont.style.display = 'none'
        }else if (data.combo >= 10){
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
const request = () => {
    fetch('/api')
    .then(res => res.json())
    .then(data => {
        var element = document.getElementById('response');
        var imgemote = document.getElementById('emoteimg');
        var comboCont = document.getElementById('comboCont');
        element.innerText = `Combo = ${data.combo} ${data.name}`
        if (imgemote.src != data.url) {
            imgemote.src = data.url
        }

        if (data.combo < 10) {
            comboCont.style.display = 'none'
        }else if (data.combo >= 10){
            comboCont.style.display = 'block'
        }
    })
}

$(document).ready(() => {
    setInterval(request, 5)
})
var dataToSended = [{
    "recombo":"yes"
}]

const postreq = () => {
    fetch('http://127.0.0.1:3000/recombo', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"recombo":"yes"})
    })
        .then(res => res.json())
        .then(data => console.log(data));
}

$(document).ready(() => {
    setInterval(postreq, 120000)
});
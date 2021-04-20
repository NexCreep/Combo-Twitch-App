const superagent = require('superagent');

function c(){
    superagent
        .post('http://127.0.0.1:3000/recombo')
        .send({ "recombo":"yes" })
        .set('X-API-Key', 'foobar')
        .set('accept', 'json')
        .end((err, res) => {
            if(err){
                console.log(`An error ocurred: ${err}`);
            }else{
                console.log(`[!] Request succesfully sended, with response => ${res.body["response"]}`);
            }
        })
}

if (require.main === module){
    setInterval(c, 90000)
}
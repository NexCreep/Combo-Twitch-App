const superagent = require('superagent');
var port = null

function c(){
    superagent
        .post(`http://127.0.0.1:${port}/recombo`)
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
    if (process.env.PORT){
        port = process.env.PORT
    }else{
        port = 3000
    }
    console.log(port);
    setInterval(c, 90000)
}
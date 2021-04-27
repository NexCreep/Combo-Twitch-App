const superagent = require('superagent');
var port = null
var canI = false

function c(){
    superagent
        .get(`http://127.0.0.1:${port}/api`)
        .set('X-API-Key', 'foobar')
        .set('accept', 'json')
        .end((err, res) => {
            if (res.body.combo != 0){
                canI = true
            }else{
                canI = false
            }
            superagent
                .post(`http://127.0.0.1:${port}/recombo`)
                .send({ "recombo":"yes", "stop":"yes" })
                .set('X-API-Key', 'foobar')
                .set('accept', 'json')
                .end((err, res) => {
                if(err){
                    console.log(`An error ocurred: ${err}`);
                }else{
                    console.log(`[!c] Request succesfully sended, with response => ${res.body["response"]} \n[!c] Count stopped`);
                    if(canI){
                        setTimeout(restart, 60000);
                    }else{
                        restart()
                    }
                }
            })
        })
}

function restart(){
    superagent
        .post(`http://127.0.0.1:${port}/recombo`)
        .send({ "recombo":"yes", "stop":"no" })
        .set('X-API-Key', 'foobar')
        .set('accept', 'json')
        .end((err, res) => {
            if(err){
                console.log(`An error ocurred: ${err}`);
            }else{
                console.log(`[!restart] Request succesfully sended, with response => ${res.body["response"]} \n[!restart] Count restarted`);
                
            }
        })
}

if (require.main === module){
    if (process.env.PORT){
        port = process.env.PORT
    }else{
        port = 3000
    }
    setInterval(c, 150000)
}
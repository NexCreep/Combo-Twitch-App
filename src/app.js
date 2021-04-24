const token = 'oauth:zzl82t30n57lzjwegiy9v9vocbyo9q'
const username = 'MayCatBot'
const channel = 'nexcreepx'
const log = {level: 'error'}
const colors = require('colors/safe')

const fs = require('fs')
const path = require('path')

const {Chat, ChatEvents} = require('twitch-js')

const express = require('express');
const hbs = require('express-handlebars');
const bodyparser = require('body-parser');
const app = express();

var comboCount = 0
var jsonToPost = {
    "name": null,
    "url": './img/none.png',    
    "combo": 0
}

const back = async () => {

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended: false}))

    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname + '/views'))
    app.engine('hbs', hbs({
        layoutsDir: path.join(__dirname + '/views/layouts'),
        extname: 'hbs',
        defaultLayout: 'main',
    }))
    app.use(express.static(path.join(__dirname + '/public')));

    app.get('/', (req, res) => {
        res.render('index')
    })

    app.get('/api', (req, res) => {
        res.json(jsonToPost)
    })

    app.post('/recombo', (req, res) => {
        if (req.body['recombo'] === 'yes') {
            comboCount = 0
            jsonToPost = {
                "name": null,
                "url": './img/none.png',
                "combo": comboCount
            }
            res.json({
                "response": "ok",
            })
        }else{
            res.json({
                "respose": "bad",
                "message": "Bad request sended, nothing to do"
            })
        }
    })

    app.listen(process.env.PORT || 3000 , () =>{
        console.log('Server started succesfully');
    })
}

const main = async () => {
    const rawdata = fs.readFileSync(path.join(__dirname + '/emotes.json'));
    const emotesjson = JSON.parse(rawdata);
    const emotesnames = emotesjson.emotesnames
    const emotesexcl = emotesjson.emotesexcl
    var emoteid = ''

    const chat = new Chat({
        username: username,
        token,
        log: log
    });
    await chat.connect();
    await chat.join(channel)
            .then(console.log(`Joined to ${channel}`));

    chat.on('PRIVMSG', msg => {
        var format = `${colors.green(msg.username)}: ${msg.message} \n`
        console.log(format);
        for (var i = 0; i <= emotesnames.length; i++) {
            if (msg.message.includes(emotesnames[i])) {

                emoteid = emotesjson.emotes[emotesnames[i]]
                console.log(formatURL(emoteid, emotesexcl))

                if (jsonToPost.name == null){
                    jsonToPost = {
                        "name": emotesnames[i],
                        "url": formatURL(emoteid, emotesexcl),
                        "combo": 0
                    }
                }

                if (emotesnames[i] === jsonToPost.name){
                    comboCount++
                    console.log(comboCount);
                }

                if (comboCount < 10) {
                    jsonToPost.combo = 0

                }   

                else {
                    jsonToPost.combo = comboCount
                }

                console.log(jsonToPost.name + " " + jsonToPost.url);
            }
        }
    })
}
var formatURL = (EID, LIST) => {

    if (EID.length >= 24){
        return `https://cdn.betterttv.net/emote/${EID}/3x`

    }else if (EID.length == 6){
        if (LIST.includes(EID)){
            return `https://static-cdn.jtvnw.net/emoticons/v1/${EID}/3.0`   
        }else{
            return `https://cdn.frankerfacez.com/emoticon/${EID}/4`
        }

    }else if (EID.length > 6 || EID.length < 6){
        return `https://static-cdn.jtvnw.net/emoticons/v1/${EID}/3.0`
    }

}

if (require.main === module){
    back()
    main()    
}
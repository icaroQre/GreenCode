const venom = require('venom-bot')
const { textReplyingText, textReplyingAudio } = require("./message")
const { userThread, runThread } = require('./api/assistent')

console.log("Inicando aplicação...")

const sessionName = "GreenCode"
venom.create({
    session: 'teste'
})
    .then((client) => { 
        start(client)
        console.log(`Sessão ${sessionName} crianda com sucesso!`)
     })
    .catch((err) => console.log(err))

function start(client) {
    client.onMessage(async (message) => {
        // console.log(message.from)
        // console.log(message)
        // console.log("Testando salvalmento de contato")
        const phoneNumber = message.from
        // saveUser()
        if(message.mediaData.mimetype !== 'audio/ogg; codecs=opus' && message.isGroupMsg === false){
            textReplyingText(client, message)
        }
        if(message.mediaData.mimetype === 'audio/ogg; codecs=opus' && message.isGroupMsg === false){
            textReplyingAudio(client, message)
        }
    })
}
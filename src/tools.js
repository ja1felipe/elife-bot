const axios = require('axios')
const token = process.env.Password
const jsonMsgs = require('./json.messages')
const message = jsonMsgs

const sendMessage = (id) => {
    let msg = message.msgMenu
    msg.recipient.id = id
    msg.message.text = "Olá, escolha uma categoria:"
    axios.post(`https://graph.facebook.com/v4.0/me/messages?access_token=${token}`, msg).then(res => {
        console.log("Success sending hello text")
    }).catch(err => {
        console.log("Fail")
    })
}

const sendNews = async (id, theme) => {

    let arr = await getNews(theme)
    if (arr.length) {
        let msg = message.msgNews
        msg.message.attachment.payload.elements = arr
        msg.recipient.id = id
        axios.post(`https://graph.facebook.com/v4.0/me/messages?access_token=${token}`, msg).then(res => {
            console.log("Success sending news")
        }).catch(err => {
            console.log("Error sending news")
        })
    } else {
        let msg = message.msgMenu
        msg.recipient.id = id
        msg.message.text = "Desculpe não temos nóticas sobre esse assunto, escolha outro:"
        axios.post(`https://graph.facebook.com/v4.0/me/messages?access_token=${token}`, msg).then(res => {
            console.log("Success sending sorry")
        }).catch(err => {
            console.log("Fail sending sorry")
        })
    }

}

const getNews = async (theme) => {
    let arr = await axios.get(`http://localhost:3000/controller/list/${theme}`)
    arr = arr.data.slice(0, 10).map(noticia => {
        return {
            title: noticia.title,
            image_url: noticia.linkImg,
            subtitle: noticia.description,
            default_action: {
                type: "web_url",
                url: noticia.link,
                messenger_extensions: false,
                webview_height_ratio: "tall"
            },
            buttons: [
                {
                    type: "web_url",
                    url: noticia.link,
                    title: "Ver notícia"
                }
            ]
        }
    })

    return arr
}

module.exports = {
    sendMessage,
    sendNews
}
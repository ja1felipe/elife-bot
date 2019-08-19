const msgSimple = {
    "recipient": {
        "id": ""
    },
    "message": {
        "text": ""
    }
}

const msgMenu = {
    "messaging_type": "RESPONSE",
    "recipient": {
        "id": ""
    },
    "message": {
        "text": "",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "Esportes",
                "payload": "Esportes",
            }, {
                "content_type": "text",
                "title": "Política",
                "payload": "Política",
            }, {
                "content_type": "text",
                "title": "Entreterimento",
                "payload": "Entreterimento",
            }, {
                "content_type": "text",
                "title": "Famosos",
                "payload": "Famosos",
            }
        ]
    }
}

const msgNews = {
    "messaging_type": "RESPONSE",
    "recipient": {
        "id": ""
    },
    "message": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": []
            }
        }
    }
}

module.exports = {
    msgSimple,
    msgMenu,
    msgNews
}
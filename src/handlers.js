const tools = require('./tools')

const handleInput = (event) => {
    if (!event.message.app_id) {
        let userId = event.sender.id
        if (event.message.quick_reply) {
            let theme = event.message.quick_reply.payload
            tools.sendNews(userId, theme)
        } else {  
            tools.sendMessage(userId)
        }
    }
}

module.exports = {
    handleInput
}
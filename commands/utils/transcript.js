const { fetchTranscript } = require("reconlx");
const { MessageAttachment } = require("discord.js");
module.exports = {
    name: "transcript",
    run: async (client, message, args) => {
        fetchTranscript(message, 10)
        .then((data) => {
            const file = new MessageAttachment(data, 'index.html')
            message.channel.send(file)
        })
    }
}
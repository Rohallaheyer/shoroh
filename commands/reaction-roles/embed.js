const { MessageEmbed } = require('discord.js')

module.exports = {
    name : 'reaction-message',
    run : async(client, message) => {
        const embed = new MessageEmbed()
        .setTitle('Reaction Role')
        .setDescription('React to obtain a role\n1️⃣ - Minecraft Role\n2️⃣ - Among Us Role')
        .setColor('Black')
        
        const msg = await message.channel.send(embed)
        await msg.react('1️⃣')
        await msg.react('2️⃣')
    }
}
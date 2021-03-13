const client = require('../index');
const { MessageEmbed } = require('discord.js');
const logsChannel = '803942006060613695'; // id channel

client.on('guildCreate', (guild) => {
    client.channels.cache.get(logsChannel).send(
        new MessageEmbed()
        .setTitle('NEW SERVER!')
        .addField('Guild INFO', `${guild.name} (${guild.id}) **${guild.memberCount} members!**`)
        .addField('Owner INFO', `${guild.owner}`)
        .setFooter(`Currently in ${client.guilds.cache.size} guilds!`)
        .setTimestamp()
        .setThumbnail(guild.iconURL({ dynamic : true}))
        .setImage('https://cdn.discordapp.com/attachments/803942006060613695/804971407472984064/image0.gif')
        .setColor('BLACK')
    )
})

client.on('guildDelete', (guild) => {
    client.channels.cache.get(logsChannel).send(
        new MessageEmbed()
        .setTitle('REMOVED FROM SERVER!')
        .addField(
            'Guild INFO', `${guild.name} (${guild.id}) **${guild.memberCount} members!**`)
        .addField('Owner INFO', `${guild.owner}`)
        .setFooter(`Currently in ${client.guilds.cache.size} guilds!`)
        .setTimestamp()
        .setThumbnail(guild.iconURL({ dynamic : true}))
        .setImage('https://cdn.discordapp.com/attachments/803942006060613695/804971407472984064/image0.gif')
        .setColor('RED')
    )
})
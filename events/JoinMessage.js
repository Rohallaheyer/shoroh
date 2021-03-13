const client = require("../index");
const { MessageEmbed } = require("discord.js");

client.on("guildCreate", (guild) => {
    let channelToSend;

    guild.channels.cache.forEach((channel) => {
        if (
            channel.type === "text" &&
            !channelToSend &&
            channel.permissionsFor(guild.me).has("SEND_MESSAGES")
        ) channelToSend = channel;
    });

    if(!channelToSend) return;

    channelToSend.send(
        new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({ dynamic : true }))
        .setTitle("Hello")
        .setDescription("Thanks for inviting me my default prefix is **&** and ill be happy to help out in this server!")
        .setColor("BLACK")
        .setImage('https://cdn.discordapp.com/attachments/803942006060613695/804971407472984064/image0.gif')
        .setFooter("AECILYS BOT")
        .setTimestamp()
    );
});

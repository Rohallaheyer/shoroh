const { prefix } = require('../index')
const client = require('../index')
const db = require('../models/command')
const schema = require('../models/custom-commands')
client.on('message', async message =>{
    const p = await client.prefix(message)
    if(message.mentions.users.first()) {
        if(message.mentions.users.first().id === '804790789192417301') return message.channel.send(`Prefix in ${message.guild.name} is ${p}`)
    }
    if (!message.content.startsWith(p)) return;
    if(!message.guild) return;
    if(message.author.bot) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(p.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    const data = await schema.findOne({ Guild: message.guild.id, Command: cmd });
    if(data) message.channel.send(data.Response);
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) {
        const check = await db.findOne({ Guild: message.guild.id })
        if(check) {
            if(check.Cmds.includes(command.name)) return message.channel.send('This command has been disabled by admins')
            command.run(client, message, args)
        } else {
            command.run(client, message, args)
        }

        //logs
        const channel = client.channels.cache.get('810058834667372564'); // channel id

        channel.send(
            `**${message.author.tag}** has used **${command.name}** command in **${message.guild.name}**`
        )
    }
});
const {Collection, Client, Discord, Guild} = require('discord.js')
const fs = require('fs')
const translate = require('@k3rn31p4nic/google-translate-api');
const client = new Client({
    disableEveryone: true,
    partials : ["MESSAGE", "CHANNEL", "REACTION"]
});
const mongoose = require('mongoose');
const { stringify } = require('querystring');

mongoose.connect('mongodb+srv://recon:09022863963@youtubetutorials.66enp.mongodb.net/Data', {
    useUnifiedTopology : true,
    useNewUrlParser: true,
}).then(console.log('Connected to mongo db!'))

//schema

client.ticketTranscript = mongoose.model('transcripts',
    new mongoose.Schema({
        channel : String,
        Content : Array
    })
)

const blacklist = require('./models/blacklist')
const prefixSchema = require('./models/prefix')
const config = require('./config.json');
const { db } = require('./models/blacklist');
const prefix = config.prefix
const token = config.token
module.exports = client;
client.ticketCategory = '806080353575632906' //ticket channel id
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 
/**
 * @param {Client} client 
 */
   client.prefix = async function(message) {
    let custom;

    const data = await prefixSchema.findOne({ Guild : message.guild.id })
        .catch(err => console.log(err))
    
    if(data) {
        custom = data.Prefix;
    } else {
        custom = prefix;
    }
    return custom;
}


client.on('messageReactionAdd', async(reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;
    if(reaction.message.id === '805375013326422087'){
        if(reaction.emoji.name === '1️⃣') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('805375262019289099')
            user.send('You have obtained minecraft role!')
        }
    }
    if(reaction.message.id === '805375013326422087'){
        if(reaction.emoji.name === '2️⃣') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('805375368940093470')
            user.send('You have obtained among us role!')
        }
    }
})
client.on('messageReactionRemove', async(reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;
    if(reaction.message.id === '805375013326422087'){
        if(reaction.emoji.name === '1️⃣') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('805375262019289099')
            user.send('Minecraft role has been removed!')
        }
    }
    if(reaction.message.id === '805375013326422087'){
        if(reaction.emoji.name === '2️⃣') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('805375368940093470')
            user.send('Among Us role has been removed!')
        }  
    }
})

client.on('message', async(message) => {
    if(message.channel.parentID !== '806080353575632906') return; //id chaneel
    client.ticketTranscript.findOne({ channel : message.channel.id }, async(err, data) => {
        if(err) throw err;
        if(data) {
            console.log('there is data')
            data.Content.push(`${message.author.tag} : ${message.content}`)
        } else {
            console.log('there is no data')
            data = new client.ticketTranscript({ channel : message.author.id, Content: `${message.author.tag} : ${message.content}`})
        }
        await data.save()
        .catch(err => console.log(err))
        console.log('data is saved')
    })
    blacklist.findOne({ id : message.author.id }, async(err, data) => {
        if(err) throw err;
        if(!data) {
            if(!message.guild) return;
            if(!message.member) message.member = await message.guild.fetchMember(message);
            const args = message.content.slice(p.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();
            if(cmd.length == 0 ) return;
            let command = client.commands.get(cmd)
            if(!command) command = client.commands.get(client.aliases.get(cmd)); 
        } else{
            message.channel.send('You are blacklisted!')
        }
    })
})
client.on('guildDelete', async (guild) => {
    prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            prefixSchema.findOneAndDelete({ Guild : guild.id }).then(console.log('deleted data.'))
        }
    })
})

client.translate = async(text, message) => {
    const lang = await db.has(`lang-${message.guild.id}`) ? await db.get(`lang-${message.guild.id}`) : 'en';
    const translated = await translate(text, {from: 'en', to: lang});
    return translated.text;
}
client.login(token)

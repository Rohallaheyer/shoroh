const client = require('../index')

client.on('ready',() => {
    client.user.setActivity("Hey | &help")
    console.log(`${client.user.username} has logged on✅`)
})

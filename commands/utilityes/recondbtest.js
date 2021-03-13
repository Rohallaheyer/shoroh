// 1 = appole
// 2 = pinople

const db = require('../../reconDB')

module.exports = {
    name: 'recondb',
    run: async(client, message, args) => {
        await db.delete(2);
    }
}
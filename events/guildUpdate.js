const mongoose = require('mongoose')
var configs = require('../serverModel.js')

module.exports = {
    name: 'guildUpdate',
    once: false,
    async execute(oldGuild, newGuild) {
    try {
    if (!oldGuild.name == newGuild.name) return
    const log = await newGuild.fetchAuditLogs({type: 'GUILD_UPDATE'})
    
    const entry = log.entries.first()
    if (!entry) return  
    author = entry.executor;
    if (!author.bot) {
      return
    }
    const guildData = await configs.findById(newGuild.id)
    if (require('../backup.js').botId == author.id || guildData['wl'].includes(author.id) || author.id == newGuild.ownerId) {
      return
    }
    await newGuild.edit({
      name: oldGuild.name
    })
    await newGuild.guild.bans.create(author).catch(err => console.log(e))
    } catch (e) {
      console.log(e)
    }
    
    }
}
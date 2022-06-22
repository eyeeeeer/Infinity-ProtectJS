const backupUsers = require('../backup.js').backupServer
var warns = {}

const mongoose = require('mongoose')
var configs = require('../serverModel.js')

module.exports = {
    name: 'guildBanAdd',
    once: false,
    async execute(ban) {
    try {
    const fetchedLogs = await ban.guild.fetchAuditLogs({
		    type: 'MEMBER_BAN_ADD',
	    })

    const entry = fetchedLogs.entries.first()
    if (!entry) return
    author = entry.executor;
    const guildData = await configs.findById(ban.guild.id)
    var limit = guildData['membersBan']['count']
    if (require('../backup.js').botId == author.id || guildData['membersBan']['mode'] === false || guildData['wl'].includes(author.id) || author.id == ban.guild.ownerId) {
      return
    }
    if (author.id in warns) {
      warns[author.id] += 1
    } else {
      warns[author.id] = 1
    }
    
    
    data = {'guild': ban.guild.id, 'author': author.id, 'user': entry.target, 'status': false, 'type': 'ban_members'}
    backupUsers.push(data)
    console.log(data)
    if (warns[author.id] >= limit) {
      warns[author.id] = 0
      await ban.guild.bans.create(author).catch(err => console.log('error'))
      
    }
    } catch (e){
      console.log(e)
    }
    }
}
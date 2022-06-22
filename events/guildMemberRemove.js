const mongoose = require('mongoose')
var configs = require('../serverModel.js')


var warns = {}

module.exports = {
    name: 'guildMemberRemove',
    once: false,
    async execute(member) {
      try {
      const fetchedLogs = await member.guild.fetchAuditLogs({
		    type: 'MEMBER_KICK',
	    })


    const entry = log.entries.first()
    if (!entry) return
     

    author = entry.executor;
    var limit = guildData['membersKick']['count']
    const guildData = await configs.findById(member.guild.id)
    if (require('../backup.js').botId == author.id || guildData['membersKick']['count'] || guildData['wl'].includes(author.id) || author.id == member.guild.ownerId) {
      return
    }
    if (author.id in warns) {
      warns[author.id] += 1
    } else {
      warns[author.id] = 1
    }
    

    if (warns[author.id] >= limit) {
      warns[author.id] = 0
      await member.guild.bans.create(author).catch(err => console.log('error'))
      
    }
    } catch {
        console.log('err')
    }
    } 
}
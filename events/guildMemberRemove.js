const mongoose = require('mongoose')
var configs = require('../serverModel.js')
mongoose.connect('mongodb+srv://admin:analforzel@cluster0.klsbg.mongodb.net/InfinityProtect?retryWrites=true&w=majority');

var warns = {}
var limit = 4

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
    const guildData = await configs.findById(member.guild.id)
    if ("964504741222678579" == author.id || guildData['antiNuke'] === false || guildData['wl'].includes(author.id) || author.id == member.guild.ownerId) {
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
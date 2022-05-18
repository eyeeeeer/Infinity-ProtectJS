const backupUsers = []
var warns = {}
var limit = 5

const mongoose = require('mongoose')
var configs = require('../serverModel.js')
mongoose.connect('mongodb+srv://admin:analforzel@cluster0.klsbg.mongodb.net/InfinityProtect?retryWrites=true&w=majority');
module.exports = {
    name: 'guildBanAdd',
    once: false,
    async execute(ban) {
    try {
    const fetchedLogs = await ban.guild.fetchAuditLogs({
		    type: 'MEMBER_BAN_ADD',
	    })

    const entry = log.entries.first()
    if (!entry) return
    author = entry.executor;
    const guildData = await configs.findById(ban.guild.id)
    if ("964504741222678579" == author.id || guildData['antiNuke'] === false || guildData['wl'].includes(author.id) || author.id == ban.guild.ownerId) {
      return
    }
    if (author.id in warns) {
      warns[author.id] += 1
    } else {
      warns[author.id] = 1
    }
    
    
    data = {'guild': ban.guild.id, 'author': author.id, 'user': entry.target, 'status': false}
    backupUsers.push(data)
    console.log(data)
    if (warns[author.id] >= limit) {
      warns[author.id] = 0
      await ban.guild.bans.create(author).catch(err => console.log('error'))
      
    }
    } catch {
      console.log('err')
    }
    }
}
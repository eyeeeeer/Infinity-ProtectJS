const backupChannels = []
var warns = {}
var limit = 3

const mongoose = require('mongoose')
var configs = require('../serverModel.js')
mongoose.connect('mongodb+srv://admin:analforzel@cluster0.klsbg.mongodb.net/InfinityProtect?retryWrites=true&w=majority');
module.exports = {
    name: 'channelDelete',
    once: false,
    async execute(channel) {
    
    //const channelDeleteId = channel.id;
    try {
    const log = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE', limit: 1})
    const entry = log.entries.first()
    if (!entry) return
     
    
    var author = entry.executor;
    const guildData = await configs.findById(channel.guild.id)
    if ("964504741222678579" == author.id || guildData['antiNuke'] === false || guildData['wl'].includes(author.id) || author.id == channel.guild.ownerId) {
      return
    }
    if (author.id in warns) {
      warns[author.id] += 1
    } else {
      warns[author.id] = 1
    }

    backupChannels.push({'guild': channel.guild.id, 'author': author.id, 'channel': channel, 'status': false})
    if (warns[author.id] >= limit) {
      warns[author.id] = 0
      await channel.guild.bans.create(author).catch(err => console.log('error'))
      for (var cnl of backupChannels) {
        if (cnl['guild'] === channel.guild.id && cnl['status'] === false) {
          await cnl['channel'].clone().catch(err => console.log('err'))
          cnl['status'] = true
        }
      }
      
    }
    
    


    } catch {
      console.log('err')
    }
        
    }
      }
const backupChannels = require('../backup.js').backupServer
var warns = {}

const mongoose = require('mongoose')
var configs = require('../serverModel.js')
mongoose.connect('mongodb+srv://admin:BdJBm8ZBY7uneonw@cluster0.klsbg.mongodb.net/InfinityProtect?retryWrites=true&w=majority');
module.exports = {
    name: 'channelDelete',
    once: false,
    async execute(channel) {
    
    //const channelDeleteId = channel.id;
    try {
    const log = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'})
    const entry = log.entries.first()
    if (!entry) return
     
    
    var author = entry.executor;
    const guildData = await configs.findById(channel.guild.id)
    var limit = guildData['channelDelete']['count']
    if (require('../backup.js').botId == author.id || guildData['channelDelete']['mode'] === false || guildData['wl'].includes(author.id) || author.id == channel.guild.ownerId) {
      return
    }
    if (author.id in warns) {
      warns[author.id] += 1
    } else {
      warns[author.id] = 1
    }

    backupChannels.push({'guild': channel.guild.id, 'author': author.id, 'channel': channel, 'status': false, 'type': 'channel_delete'})
    if (warns[author.id] >= limit) {
      warns[author.id] = 0
      await channel.guild.bans.create(author).catch(err => console.log('error'))
      for (var cnl of backupChannels) {
        if (cnl['guild'] === channel.guild.id && cnl['status'] === false && cnl['author'] == author.id) { 
          await require('../backup.js').backupAll(cnl)
          
        }
      }
      
    }
    
    


    } catch {
      console.log('err')
    }
        
    }
      }

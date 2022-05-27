const mongoose = require('mongoose')
var configs = require('../serverModel.js')

const backupChannels = require('../backup.js').backupServer
var warns = {}

mongoose.connect('mongodb+srv://admin:analforzel@cluster0.klsbg.mongodb.net/InfinityProtect?retryWrites=true&w=majority');
module.exports = {
    name: 'channelUpdate',
    once: false,
    async execute(oldChannel, newChannel) {
    try {
    if (oldChannel.name != newChannel.name) {
    const log = await newChannel.guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'})
    const entry = log.entries.first()
    if (!entry) return
    
    
    if (Date.now() - entry.createdTimestamp < 3000) {
        
    } else {
      return
    }
    //console.log(entry.target)
    author = entry.executor;
    
    const guildData = await configs.findById(newChannel.guild.id)
    var limit = guildData['channelUpdate']['count']
    if ("964504741222678579" == author.id || guildData['channelUpdate']['mode'] === false || guildData['wl'].includes(author.id) || author.id == newChannel.guild.ownerId) {
      return
    }
    if (author.id in warns) {
      warns[author.id] += 1
    } else {
      warns[author.id] = 1
    }
    
    
    data = {'guild': newChannel.guild.id, 'author': author.id, 'channel': oldChannel, 'status': false, 'channelNew': newChannel, "type": "channel_update"}
    backupChannels.push(data)
    console.log(data)
    if (warns[author.id] >= limit) {
      warns[author.id] = 0
      await newChannel.guild.bans.create(author).catch(err => console.log('error'))
      for (var cnl of backupChannels) {
        if (cnl['guild'] === newChannel.guild.id && cnl['status'] === false && cnl['author'] == author.id) {
          await require('../backup.js').backupAll(cnl)
        }
      }
      
    }
    } else {
    const log = await newChannel.guild.fetchAuditLogs({type: 'CHANNEL_OVERWRITE_CREATE'})
    const entry = log.entries.first()
      
    if (Date.now() - entry.createdTimestamp < 3000) {
        
    } else {
      if (!entry) {
      const log = await newChannel.guild.fetchAuditLogs({type: 'CHANNEL_OVERWRITE_UPDATE'})
      const entry = log.entries.first()
      if (Date.now() - entry.createdTimestamp < 3000) {
        
      } else {
        return
      }
      if (!entry) {
        return
      }
    }
    }
      
    
    
    
    
    //console.log(entry.target)
    author = entry.executor;
    
    const guildData = await configs.findById(newChannel.guild.id)
    var limit = guildData['channelUpdate']['count']
    if ("959505571277582447" == author.id || guildData['channelUpdate']['mode'] === false || guildData['wl'].includes(author.id) || author.id == newChannel.guild.ownerId) {
      return
    }
    if (author.id in warns) {
      warns[author.id] += 1
    } else {
      warns[author.id] = 1
    }
    
    
    data = {'guild': newChannel.guild.id, 'author': author.id, 'channel': oldChannel, 'status': false, 'channelNew': newChannel, 'tg': entry.changes[0]['new'], "type": "channel_update"}
    backupChannels.push(data)
    //console.log(data)
    if (warns[author.id] >= limit) {
      warns[author.id] = 0
      await newChannel.guild.bans.create(author).catch(err => console.log('error'))
      for (var cnl of backupChannels) {
        if (cnl['guild'] === newChannel.guild.id && cnl['status'] === false && cnl['author'] == author.id) {
          await require('../backup.js').backupAll(cnl)
        }
      }
      
    }
    }
            } catch {
      console.log('err')
            }
    }
}
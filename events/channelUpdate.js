const mongoose = require('mongoose')
var configs = require('../serverModel.js')

const backupChannels = []
var warns = {}
var limit = 5

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
    if ("964504741222678579" == author.id || guildData['antiNuke'] === false || guildData['wl'].includes(author.id) || author.id == newChannel.guild.ownerId) {
      return
    }
    if (author.id in warns) {
      warns[author.id] += 1
    } else {
      warns[author.id] = 1
    }
    
    
    data = {'guild': newChannel.guild.id, 'author': author.id, 'channel': oldChannel, 'status': false, 'channelNew': newChannel}
    backupChannels.push(data)
    console.log(data)
    if (warns[author.id] >= limit) {
      warns[author.id] = 0
      await newChannel.guild.bans.create(author).catch(err => console.log('error'))
      for (var cnl of backupChannels) {
        if (cnl['guild'] === newChannel.guild.id && cnl['status'] === false) {
          console.log('i see')
          await cnl['channelNew'].setName(cnl['channel'].name).catch(err => console.log(err))
          cnl['status'] = true
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
    if ("959505571277582447" == author.id || guildData['antiNuke'] === false || guildData['wl'].includes(author.id) || author.id == newChannel.guild.ownerId) {
      return
    }
    if (author.id in warns) {
      warns[author.id] += 1
    } else {
      warns[author.id] = 1
    }
    
    
    data = {'guild': newChannel.guild.id, 'author': author.id, 'channel': oldChannel, 'status': false, 'channelNew': newChannel, 'tg': entry.changes[0]['new']}
    backupChannels.push(data)
    //console.log(data)
    if (warns[author.id] >= limit) {
      warns[author.id] = 0
      await newChannel.guild.bans.create(author).catch(err => console.log('error'))
      for (var cnl of backupChannels) {
        if (cnl['guild'] === newChannel.guild.id && cnl['status'] === false) {
          
          await cnl['channelNew'].permissionOverwrites.delete(cnl['tg']).catch(err => console.log(err))
          cnl['status'] = true
        }
      }
      
    }
    }
            } catch {
      console.log('err')
            }
    }
}
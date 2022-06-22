const backupChannels = require('../backup.js').backupServer
var warns = {}

const mongoose = require('mongoose')
var configs = require('../serverModel.js')

module.exports = {
    name: 'webhookUpdate',
    once: false,
    async execute(channel) {
    try {
    const log = await channel.guild.fetchAuditLogs({type: 'WEBHOOK_CREATE'})

    const entry = log.entries.first()
    if (!entry) return
    
    
     if (Date.now() - entry.createdTimestamp < 3000) {
        
    } else {
      return
    }
    //console.log(entry.target)
    author = entry.executor;
    
    const guildData = await configs.findById(channel.guild.id)
    var limit = guildData['webhookCreate']['count']
    if (require('../backup.js').botId == author.id || guildData['webhookCreate']['mode'] === false || guildData['wl'].includes(author.id) || author.id == channel.guild.ownerId) {
      return
    }
    if (author.id in warns) {
      warns[author.id] += 1
    } else {
      warns[author.id] = 1
    }
    
    
    data = {'guild': channel.guild.id, 'author': author.id, 'webhook': entry.target, 'status': false, 'type': 'webhook_create'}
    backupChannels.push(data)
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
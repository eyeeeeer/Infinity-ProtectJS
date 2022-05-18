const backupChannels = []
var warns = {}
var limit = 10

const mongoose = require('mongoose')
var configs = require('../serverModel.js')
mongoose.connect('mongodb+srv://admin:analforzel@cluster0.klsbg.mongodb.net/InfinityProtect?retryWrites=true&w=majority');
module.exports = {
    name: 'channelCreate',
    once: false,
    async execute(channel) {
      try {
    
    //const channelDeleteId = channel.id;
    const log = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'})

    const entry = log.entries.first()
    if (!entry) return
     

     
    
    author = entry.executor;
    const guildData = await configs.findById(channel.guild.id)
    if ("964504741222678579" == author.id || guildData['antiNuke'] === false || guildData['wl'].includes(author.id) || author.id == channel.guild.ownerId) {
      return
    }
    if (author.id in warns) {
      warns[author.id] += 1
    } else {
      warns[author.id] = 1
    }
    
    
    data = {'guild': channel.guild.id, 'author': author.id, 'channel': channel, 'status': false}
    backupChannels.push(data)
    console.log(data)
    if (warns[author.id] >= limit) {
      warns[author.id] = 0
      await channel.guild.bans.create(author).catch(err => console.log('error'))
      for (var cnl of backupChannels) {
        if (cnl['guild'] === channel.guild.id && cnl['status'] === false) {
          await cnl['channel'].delete().catch(err => console.log('err'))
          cnl['status'] = true
        }
      }
      
    }
    
    


      } catch (e) {
        console.log(e)
      }
        
    }
      }
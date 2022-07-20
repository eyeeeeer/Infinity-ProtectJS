const backupChannels = require('../backup.js').backupServer
var warns = {}

const mongoose = require('mongoose')
var configs = require('../serverModel.js')
mongoose.connect('mongodb+srv://admin:BdJBm8ZBY7uneonw@cluster0.klsbg.mongodb.net/InfinityProtect?retryWrites=true&w=majority');
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
    var limit = guildData['channelCreate']['count']
    if (require('../backup.js').botId == author.id || guildData['channelCreate']['mode'] === false || guildData['wl'].includes(author.id) || author.id == channel.guild.ownerId) {
      return
    }
    if (author.id in warns) {
      warns[author.id] += 1
    } else {
      warns[author.id] = 1
    }
    
    
    data = {'guild': channel.guild.id, 'author': author.id, 'channel': channel, 'status': false, 'type': 'channel_create'}
    backupChannels.push(data)
    console.log(data)
    if (warns[author.id] >= limit) {
      warns[author.id] = 0
      await channel.guild.bans.create(author).catch(err => console.log('error'))
      for (var cnl of backupChannels) {
        if (cnl['guild'] === channel.guild.id && cnl['status'] === false && cnl['author'] == author.id) {
          await require('../backup.js').backupAll(cnl)
        }
      }
      
    }
    
    


      } catch (e) {
        console.log(e)
      }
        
    }
      }

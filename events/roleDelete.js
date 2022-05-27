const backupRoles = require('../backup.js').backupServer
var warns = {}

const mongoose = require('mongoose')
var configs = require('../serverModel.js')
mongoose.connect('mongodb+srv://admin:analforzel@cluster0.klsbg.mongodb.net/InfinityProtect?retryWrites=true&w=majority')
module.exports = {
    name: 'roleDelete',
    once: false,
    async execute(role) {
    try {
    //const channelDeleteId = channel.id;
    const log = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'})
 
    const entry = log.entries.first()
   
     
    if (!entry) return
     
    
    author = entry.executor;
    const guildData = await configs.findById(role.guild.id)
    var limit = guildData['roleDelete']['count']
    if ("964504741222678579" == author.id || guildData['roleDleete']['count'] === false || guildData['wl'].includes(author.id) || author.id == role.guild.ownerId) {
      return
    }
    if (author.id in warns) {
      warns[author.id] += 1
    } else {
      warns[author.id] = 1
    }
    
    
    data = {'guild': role.guild.id, 'author': author.id, 'role': role, 'status': false, 'type': 'role_delete'}
    backupRoles.push(data)
    if (warns[author.id] >= limit) {
      warns[author.id] = 0
      await role.guild.bans.create(author).catch(err => console.log('error'))
      for (var rl of backupRoles) {
        if (rl['guild'] === role.guild.id && rl['status'] === false && rl['author'] == author.id) {
          await require('../backup.js').backupAll(rl)
        }
      }
      
    }
    } catch {
      console.log('err')
    }
    }
      }
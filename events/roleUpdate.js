const mongoose = require('mongoose')
var configs = require('../serverModel.js')

const backupRoles = require('../backup.js').backupServer
var warns = {}



module.exports = {
    name: 'roleUpdate',
    once: false,
    async execute(oldRole, newRole) {
    try {
    const log = await newRole.guild.fetchAuditLogs({type: 'ROLE_UPDATE'})
    //console.log(log)

    const entry = log.entries.first()
    
     
    if (!entry) return
    
    
    if (Date.now() - entry.createdTimestamp < 3000) {
        
    } else {
      return
    }
    console.log(entry)
    author = entry.executor;
    
    const guildData = await configs.findById(newRole.guild.id)
    var limit = guildData['roleUpdate']['count']
    if (require('../backup.js').botId == author.id || guildData['roleUpdate']['mode'] === false || guildData['wl'].includes(author.id) || author.id == newRole.guild.ownerId) {
      return
   }
    if (author.id in warns) {
      warns[author.id] += 1
    } else {
      warns[author.id] = 1
    }
    
    
    data = {'guild': newRole.guild.id, 'author': author.id, 'oldRole': oldRole, 'newRole': newRole, 'status': false, 'changes': entry.changes[0], 'type': 'role_update'}
    backupRoles.push(data)
    if (warns[author.id] >= limit) {
      warns[author.id] = 0
      await newRole.guild.bans.create(author).catch(err => console.log('error'))
      for (var rl of backupRoles) {
        if (rl['guild'] === newRole.guild.id && rl['status'] === false && rl['author'] == author.id) {
          await require('../backup.js').backupAll(rl)
        }
      }
    }
    } catch {
      console.log('err')
    }
    }
}
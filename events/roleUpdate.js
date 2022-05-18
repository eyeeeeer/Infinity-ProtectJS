const mongoose = require('mongoose')
var configs = require('../serverModel.js')

const backupRoles = []
var warns = {}
var limit = 2

mongoose.connect('mongodb+srv://admin:analforzel@cluster0.klsbg.mongodb.net/InfinityProtect?retryWrites=true&w=majority')
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
    if ("964504741222678579" == author.id || guildData['antiNuke'] === false || guildData['wl'].includes(author.id) || author.id == newRole.guild.ownerId) {
      return
   }
    if (author.id in warns) {
      warns[author.id] += 1
    } else {
      warns[author.id] = 1
    }
    
    
    data = {'guild': newRole.guild.id, 'author': author.id, 'oldRole': oldRole, 'newRole': newRole, 'status': false, 'changes': entry.changes[0]}
    backupRoles.push(data)
    if (warns[author.id] >= limit) {
      warns[author.id] = 0
      await newRole.guild.bans.create(author).catch(err => console.log('error'))
      for (var rl of backupRoles) {
        if (rl['guild'] === newRole.guild.id && rl['status'] === false) {
          await rl['newRole'].setPermissions(rl['changes']['old'])
          rl['status'] = true
        }
      }
    }
    } catch {
      console.log('err')
    }
    }
}
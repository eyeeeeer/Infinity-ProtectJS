const backupRoles = []
var warns = {}
var limit = 10

const mongoose = require('mongoose')
var configs = require('../serverModel.js')
mongoose.connect('mongodb+srv://admin:analforzel@cluster0.klsbg.mongodb.net/InfinityProtect?retryWrites=true&w=majority')
module.exports = {
    name: 'roleCreate',
    once: false,
    async execute(role) {
    
    //const channelDeleteId = channel.id;
    try {
    const log = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'})
    const entry = log.entries.first()
    if (!entry) return
     
 
     
    
    author = entry.executor;
    const guildData = await configs.findById(role.guild.id)
   if ("959505571277582447" == author.id || guildData['antiNuke'] === false || guildData['wl'].includes(author.id) || author.id == role.guild.ownerId) {
      return
    }
    if (author.id in warns) {
      warns[author.id] += 1
    } else {
      warns[author.id] = 1
    }
    
    
    data = {'guild': role.guild.id, 'author': author.id, 'role': role, 'status': false}
    backupRoles.push(data)
    if (warns[author.id] >= limit) {
      warns[author.id] = 0
      await role.guild.bans.create(author).catch(err => console.log('error'))
      for (var rl of backupRoles) {
        if (rl['guild'] === role.guild.id && rl['status'] === false) {
          rl['role'].delete().catch(console.error);             
          rl['status'] = true
        }
      }
      
    }
    } catch {
      console.log('err')
    }
        }
      }
const backupServer = []
const bot = '964504741222678579'



exports.backupAll = async function (obj) {
  try {
  type = obj['type']
  if (type == "channel_create") {
    await obj['channel'].delete().catch(err => console.log('err'))
          
   obj['status'] = true
  }


  if (type == "channel_delete") {
    await obj['channel'].clone().catch(err => console.log('err'))
          obj['status'] = true
  }
  if (type == "role_create") {
    await obj['role'].delete().catch(err => console.log('err'))
          obj['status'] = true
  }
  if (type == "role_delete") {
    await obj['role'].guild.roles.create({
              data: {
                name: obj['role'].name,
                color: 'BLUE',
              },
              reason: 'Восстановление сервера',
            })
                  .then(console.log)
                  .catch(console.error);
          obj['status'] = true
  }
  if (type == "role_update") {
    await obj['newRole'].setPermissions(rl['changes']['old'])
          obj['status'] = true
  }
  if (type == "webhook_create") {
    await obj['webhook'].delete().catch(err => console.log('err'))
    obj['status'] = true
  }
  } catch {
    console.log('err')
  }
}
exports.backupServer = backupServer
exports.botId = bot
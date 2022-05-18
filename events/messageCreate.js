const mongoose = require('mongoose') //amongoose
var configs = require('../serverModel.js')
const messagesData = []
const warns = {}
var limit = 3
mongoose.connect('mongodb+srv://admin:analforzel@cluster0.klsbg.mongodb.net/InfinityProtect?retryWrites=true&w=majority')
module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message) {
      try {
      const triggerWords = ['@everyone', '@here']
    if (message.author.bot) {
      triggerWords.forEach((word) => {
if (message.content.includes(word)) {
       if (message.author.id in warns) {
      warns[message.author.id] += 1
    } else {
      warns[message.author.id] = 1
       }
       data = {'guild': message.guild.id, 'author': message.author, 'msg': message, 'status': false}
      messagesData.push(data)
       if (warns[message.author.id] >= limit) {
         for (var dt of messagesData) {
           if (dt['guild'] == message.guild.id && dt['status'] == false) {
           dt['msg'].delete()

          if (dt['msg'].webhookId) {
            message.guild.fetchWebhooks().then(webhooks => {
              webhooks.forEach(webhook => {
                if (webhook.id == dt['msg'].author.id) {
                  webhook.delete().catch(e => console.log(e))
                }
              })
            })
                                               
            
          } else {
           
           message.guild.bans.create(dt['author'])
          }


}


}

         
}
      //console.log('g')//message.delete().catch(err => {
      //return console.log(err)
    
    }
         })
    }
    
  
      } catch (e) {
        console.log(e)
      }
    }
}
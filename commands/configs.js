
const mongoose = require('mongoose')
const conf = require('../serverModel.js')
mongoose.connect('mongodb+srv://admin:analforzel@cluster0.klsbg.mongodb.net/InfinityProtect?retryWrites=true&w=majority')
var eventsList = ['channelCreate', 'channelDelete', 'channelUpdate', 'roleCreate', 'roleDelete', 'roleUpdate', 'webhookCreate', 'membersBan', 'membersKick']
module.exports = {
 
	name: 'configs',
	description: 'Настройки сервера',
	default_permission: true,
	permissions: [],
	async execute(client, interaction, f) {
    if (interaction.user.id == interaction.guild.ownerId) {
} else {
      return interaction.reply({embeds: [f.aembed("Ошибка", 'Вы не являетесь владельцем сервера', f.colors.default)]})
    }
    var cf = await conf.findById(interaction.guild.id)
    var cnlCreate = {'count': cf['channelCreate']['count'], 'mode': cf['channelCreate']['mode']}
    eList = []
    


    for (var e of eventsList) {
      b = e
      var y = `${cf[e]['mode']}`
    if (y == "true") {
       y = ":green_circle: Включен"
    } else {
      y = ":red_circle: Выключен"
    }
      if (e == "channelCreate"){
        e = `Создание каналов (${e})`
      }
      if (e == "channelDelete"){
        e = `Удаление каналов (${e})`
      }if (e == "channelUpdate"){
        e = `Редактирование каналов (${e})`
      }if (e == "roleCreate"){
        e = `Создание ролей (${e})`
      }if (e == "roleDelete"){
        e = `Удаление ролей (${e})`
      }if (e == "roleUpdate"){
        e = `Обновление ролей (${e})`
      }if (e == "webhookCreate"){
        e = `Создание вебхуков (${e})`
      }if (e == "membersBan"){
        e = `Бан участников (${e})`
      }if (e == "membersKick"){
        e = `Кик участников (${e})`
      }
      eList.push(`**${e}**\nКол-во: ${cf[b]['count']}\n${y}\n`)




      
      
      var answ = eList.join("\n")
    }
    
    
		return interaction.reply({embeds: [f.aembed("⚙ | Настройки", answ, f.colors.default)]})
	},
}

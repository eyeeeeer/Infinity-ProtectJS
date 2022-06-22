const mongoose = require('mongoose')
var configs = require('../serverModel.js')

var eventsList = ['channelCreate', 'channelDelete', 'channelUpdate', 'roleCreate', 'roleDelete', 'roleUpdate', 'webhookCreate', 'membersBan', 'membersKick']

module.exports = {
	name: 'antinuke',
	description: 'Управление анти крашем',
	options: [{
		name: 'configs',
		description: 'Настроить анти краш',
		type: 'SUB_COMMAND',
    options: [{
		name: 'event',
		description: 'Выбрать событие',
		type: 'STRING',
		choices: [{
			name: 'channelDelete',
			value: 'channelDelete'
		},
		{
			name: 'channelCreate',
			value: 'channelCreate'
		},
    {
			name: 'channelUpdate',
			value: 'channelUpdate'
    },
    {
			name: 'roleCreate',
			value: 'roleCreate'
    }, 
    {
			name: 'roleDelete',
			value: 'roleDelete'
    },
    {
			name: 'roleUpdate',
			value: 'roleUpdate'
    }, 
    {
			name: 'webhookCreate',
			value: 'webhookCreate'
    }, 
    {
			name: 'membersBan',
			value: 'membersBan'
    }, 
    {
			name: 'membersKick',
			value: 'membersKick'
    }],
		required: true,
    
  }, {
    name: 'count',
		description: 'Настройка чувствительности',
		type: 'NUMBER',
    required: true
  }, {
    name: 'mode',
		description: 'Включить/Выключить событие',
		type: 'BOOLEAN',
    required: true,
		
  
  }]
  }, {
    name: 'list',
		description: 'Список настроек анти краша',
		type: 'SUB_COMMAND'
  }],
	default_permission: true,
	permissions: [],
	async execute(client, interaction, f) {
    if (interaction.user.id == interaction.guild.ownerId) {
} else {
      return interaction.reply({embeds: [f.aembed("Ошибка", 'Вы не являетесь владельцем сервера', f.colors.default)]})
    }
    const subcommand = interaction.options.getSubcommand()
    if (subcommand == 'configs') {
    var data = await configs.findById(interaction.guild.id)
    const event = interaction.options.getString('event')
    const count = interaction.options.getNumber('count')
    const mode = interaction.options.getBoolean('mode')


    if (event == "channelCreate") await configs.findOneAndUpdate({ _id: interaction.guild.id}, {
          'channelCreate.count': count,
          'channelCreate.mode': mode
          
      })
    if (event == "channelDelete") await configs.findOneAndUpdate({ _id: interaction.guild.id}, {
          'channelDelete.count': count,
          'channelDelete.mode': mode
          
      })
    if (event == "channelUpdate") await configs.findOneAndUpdate({ _id: interaction.guild.id}, {
          'channelUpdate.count': count,
          'channelUpdate.mode': mode
          
      })
    if (event == "roleCreate") await configs.findOneAndUpdate({ _id: interaction.guild.id}, {
          'roleCreate.count': count,
          'roleCreate.mode': mode
          
      })
     if (event == "roleDelete") await configs.findOneAndUpdate({ _id: interaction.guild.id}, {
          'roleDelete.count': count,
          'roleDelete.mode': mode
          
      })
      if (event == "roleUpdate") await configs.findOneAndUpdate({ _id: interaction.guild.id}, {
          'roleUpdate.count': count,
          'roleUpdate.mode': mode
          
      })
      if (event == "membersBan") await configs.findOneAndUpdate({ _id: interaction.guild.id}, {
          'membersBan.count': count,
          'membersBan.mode': mode
          
      })
      if (event == "membersKick") await configs.findOneAndUpdate({ _id: interaction.guild.id}, {
          'membersKick.count': count,
          'membersKick.mode': mode
          
      })

     if (event == "webhookCreate") await configs.findOneAndUpdate({ _id: interaction.guild.id}, {
          'webhookCreate.count': count,
          'webhookCreate.mode': mode
          
      })
    var y = `${data[event]['mode']}`
    if (y == "true") {
       y = ":green_circle: Включен"
    } else {
      y = ":red_circle: Выключен"
    }






    return interaction.reply({embeds: [f.aembed("успешно", `Обновил настройки события ${event}\n\nКол-во действий: ${count}\n${y}`, f.colors.default)]})
    }
    if (subcommand == 'list') {
      var cf = await configs.findById(interaction.guild.id)
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
    }
    
  }
}

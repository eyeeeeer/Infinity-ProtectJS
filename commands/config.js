const mongoose = require('mongoose')
var configs = require('../serverModel.js')
mongoose.connect('mongodb+srv://admin:analforzel@cluster0.klsbg.mongodb.net/InfinityProtect?retryWrites=true&w=majority')

module.exports = {
	name: 'config',
	description: 'Управление событиями',
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
		

  }],
	default_permission: true,
	permissions: [],
	async execute(client, interaction, f) {
    if (interaction.user.id == interaction.guild.ownerId) {
} else {
      return interaction.reply({embeds: [f.aembed("Ошибка", 'Вы не являетесь владельцем сервера', f.colors.default)]})
    }
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
}

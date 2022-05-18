const mongoose = require('mongoose')
var configs = require('../serverModel.js')
mongoose.connect('mongodb+srv://admin:analforzel@cluster0.klsbg.mongodb.net/InfinityProtect?retryWrites=true&w=majority')

module.exports = {
	name: 'wl',
	description: 'Управление белым списком',
  options: [{
		name: 'add',
		description: 'Добавить пользователя в белый список',
		type: 'SUB_COMMAND',
    options: [{
      name: 'member',
      description: 'Выберите пользователя',
      type: 'USER',
      required: true
    }]}, {
      name: 'remove',
		description: 'Удалить пользователя из белого списка',
		type: 'SUB_COMMAND',
    options: [{
      name: 'member',
      description: 'Выберите пользователя',
      type: 'USER',
      required: true
    }]
    
  }, {
    name: 'list',
		description: 'Посмотреть белый список',
		type: 'SUB_COMMAND',
  }],
	default_permission: true,
	permissions: [],
	async execute(client, interaction, f) {
    if (interaction.user.id == interaction.guild.ownerId) {
} else {
      return interaction.reply({embeds: [f.aembed("Ошибка", 'Вы не являетесь владельцем сервера', f.colors.default)]})
    }
    const member = interaction.options.getUser('member')

    const subcommand = interaction.options.getSubcommand()
    var data = await configs.findById(interaction.guild.id)
    if (subcommand == "add") {
       if (data['wl'].includes(member.id)) {
         return interaction.reply({embeds: [f.aembed('Ошибка', `Пользователь ${member.username}/${member.id} уже есть в белом списке`, f.colors.error)]});
       }
       await configs.findOneAndUpdate({ _id: interaction.guild.id },{
            $push: {wl: member.id}
       })
		   return interaction.reply({embeds: [f.aembed('Успешно', `Пользователь ${member.username}/${member.id} был добавлен в белый список`, f.colors.default)]});
    }
  if (subcommand == "remove") {
       if (!data['wl'].includes(member.id)) {
         return interaction.reply({embeds: [f.aembed('Ошибка', `${member.username}/${member.id} нету в белом списке`, f.colors.error)]});
         }
       await configs.findOneAndUpdate({ _id: interaction.guild.id },{
            $pull: {wl: member.id}
       })
		   return interaction.reply({embeds: [f.aembed('Успешно', `Пользователь ${member.username}/${member.id} был удалён из белого списка`, f.colors.default)]});
  }
  if (subcommand == "list") {
     
     var whiteList = await configs.findById(interaction.guild.id)
     us = []
     for (var use of whiteList['wl']) {
       

       u = await client.users.fetch(use)
       us.push(`${u.tag}/${u.id}`)
     }
     if (us.length == 0) {
       var l = 'Список пуст'
     } else {
       var l = us.join("\n")
     }
     return interaction.reply({embeds: [f.aembed('Белый список', l , f.colors.default)]});
  }
}
}; 

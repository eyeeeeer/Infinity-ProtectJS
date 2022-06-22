const mongoose = require('mongoose')
var configs = require('../serverModel.js')


module.exports = {
	name: 'mode',
	description: 'Открыть/закрыть сервер',
  options: [{
    name: 'status',
    description: 'false - сервер открыт, true - сервер закрыт',
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
    const status = interaction.options.getBoolean('status')
    await configs.findOneAndUpdate({ _id: interaction.guild.id}, {
          'mode': status,
          
      })
    var y = status
    if (y == "false") {
       y = ":green_circle: **открыт**"
    } else {
      y = ":red_circle: **закрыт**"
    }
    return interaction.reply({embeds: [f.aembed("Успешно", `Теперь сервер ${y}`, f.colors.default)]})
  }
}
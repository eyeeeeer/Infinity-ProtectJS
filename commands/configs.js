
const mongoose = require('mongoose')
const conf = require('../serverModel.js')
mongoose.connect('mongodb+srv://admin:analforzel@cluster0.klsbg.mongodb.net/InfinityProtect?retryWrites=true&w=majority')

module.exports = {
 
	name: 'config',
	description: 'Настройки сервера',
	default_permission: true,
	permissions: [],
	async execute(client, interaction, f) {
    if (interaction.user.id == interaction.guild.ownerId) {
} else {
      return interaction.reply({embeds: [f.aembed("Ошибка", 'Вы не являетесь владельцем сервера', f.colors.default)]})
    }
    var cf = await conf.findById(parseInt(interaction.guild.id))
    if (cf['antiNuke'] === true) {
      var val = '**включена**'
    } else {
      var val = '**выключена**'
    }
    
    
		return interaction.reply({embeds: [f.aembed("⚙ | Настройки", 'Защита от краша: ' + val, f.colors.default)]})
	},
}

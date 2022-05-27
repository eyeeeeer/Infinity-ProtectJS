const mongoose = require('mongoose')
const configs = require('../serverModel.js')
mongoose.connect('mongodb+srv://admin:analforzel@cluster0.klsbg.mongodb.net/InfinityProtect?retryWrites=true&w=majority')

//в файле serverModel можно сделать //это монго дб, а нужен он для коннекта
module.exports = {
	name: 'antinuke',
	description: 'Включить/Выключить антикраш',
	options: [{
		name: 'toggle',
		description: 'Включить/Выключить',
		type: 'BOOLEAN',
    required: true
	}],
	default_permission: true,
	permissions: [],	
    async execute(client, interaction, f) {
    if (interaction.user.id == interaction.guild.ownerId) {
} else {
      return interaction.reply({embeds: [f.aembed("Ошибка", 'Вы не являетесь владельцем сервера', f.colors.default)]})
}
    let toggled = interaction.options.getBoolean('toggle') //|| true
     await configs.findOneAndUpdate({ _id: interaction.guild.id}, {
          antiNuke: toggled,
           //яе ему не нравится??
     })// там схему можно только один раз обьявлять
    if (toggled == true) {
      toggled = "включён"  
    } else {
      toggled = "выключен"
    }
  
      
    
		
      
		return interaction.reply({embeds: [f.aembed("ошибка", 'Команда больше не актуальна', f.colors.default)]}); //ага хд
	},
};
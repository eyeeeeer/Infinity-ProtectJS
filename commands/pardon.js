const { Permissions } = require('discord.js');
const banCollection = require('../banModel.js')
var configs = require('../serverModel.js')
module.exports = {
  name: 'pardon',
  description: 'Разбанить пользователя',
  options: [{
    name: 'user_id',
    description: 'Айди пользователя, которого хотите разбанить',
    type: 'STRING',
    required: true
  }],
  default_permission: true,
	permissions: [],
  async execute(client, interaction, f) {
    const author = interaction.guild.members.cache.find(mem => mem.user.id === interaction.user.id)
    const guildData = await configs.findById(interaction.guild.id)
    if (!author.permissions.has(Permissions.FLAGS.ADMINISTRATOR)|| !guildData['wl'].includes(author.id) && !interaction.guild.ownerId == author.id){
	return interaction.reply({embeds: [f.aembed('ошибка', 'Для использования данной команды необходимы права администратора, а также быть в белом списке' , f.colors.default)]});
}
    const userId = interaction.options.getString('user_id')
    user = await client.users.fetch(userId)
    await interaction.guild.bans.remove(userId).catch(async (e) => {
      return interaction.reply({embeds: [f.aembed('ошибка', 'У бота нету прав и/или пользователя нету в списке банов' , f.colors.default)]});
    })
    await banCollection.deleteOne({
        memberId: userId,
        guildId: interaction.guild.id
      })
    return interaction.reply({embeds: [f.aembed('Разбан', `Пользователь **${user.tag}/${user.id}** был разбанен\nМодератор: **${author.user.tag}**` , f.colors.default)]})
  }
}
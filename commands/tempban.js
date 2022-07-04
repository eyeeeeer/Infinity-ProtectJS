const { Permissions } = require('discord.js');
const banCollection = require('../banModel.js')
var configs = require('../serverModel.js')
module.exports = {
  name: 'tempban',
  description: 'Временно забанить пользователя',
  options: [{
    name: 'user',
    description: 'Юзер, которого вы хотите забанить',
    type: 'USER',
    required: true
  }, {
    name: 'd',
    description: 'Укажите количество дней бана',
    type: 'INTEGER',
    required: true
  }, {
    name: 'h',
    description: 'Укажите количество часов бана',
    type: 'INTEGER',
    required: true
  }, {
    name: 'm',
    description: 'Укажите количество минут бана',
    type: 'INTEGER',
    required: true
  }, {
    name: 'reason',
    description: 'Причина бана',
    type: 'STRING',
    required: false
  }],
  default_permission: true,
	permissions: [],
  async execute(client, interaction, f) {
    const author = interaction.guild.members.cache.find(mem => mem.user.id === interaction.user.id)
    const guildData = await configs.findById(interaction.guild.id)
    if (!author.permissions.has(Permissions.FLAGS.ADMINISTRATOR)|| !guildData['wl'].includes(author.id) && !interaction.guild.ownerId == author.id){
	return interaction.reply({embeds: [f.aembed('ошибка', 'Для использования данной команды необходимы права администратора, а также быть в белом списке' , f.colors.default)]});
}
    var reason = interaction.options.getString('reason')
    if (!reason) {
      reason = 'отсутствует'
    }
    var user = interaction.options.getUser('user')
    user = interaction.guild.members.cache.find(mem => mem.user.id === user.id)
    const days = interaction.options.getInteger('d')
    const hours = interaction.options.getInteger('h')
    const minutes = interaction.options.getInteger('m')
    var timeNow = Math.floor(Date.now() / 1000)
    var banDuration = timeNow + (minutes * 60) + (hours * 3600) + (days * 86400)
    if (hours < 0 || days < 0 || minutes < 0){
      return interaction.reply({embeds: [f.aembed('ошибка', 'Числа не могут быть отрицательными!' , f.colors.default)]})
    }
    if (hours == 0 && days == 0 && minutes == 0) {
      return interaction.reply({embeds: [f.aembed('ошибка', 'Это команда для временного бана, а не бессрочного.' , f.colors.default)]})
    }
    var banList = await banCollection.findOne({
      guildId: interaction.guild.id,
      memberId: user.id
  })
    if (banList) {
      return interaction.reply({embeds: [f.aembed('ошибка', 'Пользователь уже в бане' , f.colors.default)]})
    }
    if (author.id == interaction.guild.ownerId) {
      const authorRoles = author.roles.cache.filter(role => role.id != interaction.guild.id).sort((a, b) => b.position - a.position).map(role => role.position)[0];
      const userRoles = user.roles.cache.filter(role => role.id != interaction.guild.id).sort((a, b) => b.position - a.position).map(role => role.position)[0]
      if (userRoles >= authorRoles) {
        return interaction.reply({embeds: [f.aembed('ошибка', 'Вы не можете банить пользоваталей, у которых позиция роли выше вашей или являлется одинаковой' , f.colors.default)]})
      }
    }
    if (author.id == user.id) {
      return interaction.reply({embeds: [f.aembed('ошибка', 'Вы не можете забанить самого себя' , f.colors.default)]})
    }
    if (user.id == require('../backup.js').botId) {
      return interaction.reply({embeds: [f.aembed('ошибка', 'А ты гений' , f.colors.default)]})
    }
    var data = new banCollection({ guildId: interaction.guild.id, memberId: user.id, banDuration: banDuration, reason: reason, author: author.id});
      data.save(function (err, data) {
       if (err) {
         console.error(err)
         return interaction.reply({embeds: [f.aembed('ошибка', 'Не получается добавить пользователя в бд' , f.colors.default)]})
    }
       });
    
    await user.send({embeds: [f.aembed('Бан!', `Вы были временно забанены на сервере **${interaction.guild.name}**\nПричина: **${reason}**\nМодератор: **${author.user.tag}**\nБан действует до: <t:${banDuration}:f>` , f.colors.default)]}).catch(e => console.log(e))
    if (!user.bannable) {
      return interaction.reply({embeds: [f.aembed('ошибка', 'Я не могу забанить данного пользователя' , f.colors.default)]})
    }
    await user.ban({reason: reason, days: 0}).catch(e => console.log(e))

  return interaction.reply({embeds: [f.aembed('Бан!', `Пользователь **${user.user.tag}/${user.id}** был временно забанен\nПричина: **${reason}**\nМодератор: **${author.user.tag}**\nЗабанен до: <t:${banDuration}:f>` , f.colors.default)]})
    
       }
    
  }
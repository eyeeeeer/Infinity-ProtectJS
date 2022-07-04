const { Permissions } = require('discord.js');

module.exports = {
  name: 'timeout',
  description: 'Ограничить определенному юзеру доступ к каналам',
  options: [{
    name: 'user',
    description: 'Укажите пользователя',
    type: 'USER',
    required: true
  }, {
    name: 'duration',
    description: 'Длительность таймаута',
    type: 'INTEGER',
    choices: [{
      name: '10 минут',
      value: 1000 * 60 * 10
    }, {
      name: '30 минут',
      value: 1000 * 60 * 30
    }, {
      name: '1 час',
      value: 1000 * 60 * 60 * 1
    }, {
      name: '3 часа',
      value: 1000 * 60 * 60 * 3
    }, {
      name: '6 часов',
      value: 1000 * 60 * 60 * 6
    }, {
      name: '12 часов',
      value: 1000 * 60 * 60 * 12
    }, {
      name: '1 день',
      value: 1000 * 60 * 60 * 24 * 1
    }, {
      name: '3 дня',
      value: 1000 * 60 * 60 * 24 * 3
    }, {
      name: '7 дней',
      value: 1000 * 60 * 60 * 24 * 7
    }, {
      name: '27 дней',
      value: 1000 * 60 * 60 * 24 * 27
    }],
    required: true
  }, {
    name: 'reason',
    description: 'Причина таймаута',
    type: 'STRING',
  }],
  default_permission: true,
  permissions: [],
  async execute(client, interaction, f) {
    const author = interaction.guild.members.cache.find(mem => mem.user.id === interaction.user.id)
    var target = interaction.options.getUser('user')
    target = interaction.guild.members.cache.find(mem => mem.user.id === target.id)
    if (!author.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
	return interaction.reply({embeds: [f.aembed('ошибка', 'У вас нету прав администратора!' , f.colors.default)]});
}
    var choices = interaction.options.getInteger('duration')
    var reason = interaction.options.getString('reason')
    await target.timeout(choices, reason).catch(e => {
      return interaction.reply({embeds: [f.aembed('ошибка', `Я не могу замьютить пользователя, поскольку у меня нету прав и/или пользователь имеет права администратора.` , f.colors.default)]})
    })
    return interaction.reply({embeds: [f.aembed('Таймаут!', `Пользователь **${target.user.tag}/${target.user.id}** был замьючен.` , f.colors.default)]})
    

    
  }
}
module.exports = {
	name: 'info',
	description: 'Информация о боте',
	default_permission: true,
	permissions: [],
	async execute(client, interaction, f) {
    return interaction.reply(
      {
        embeds: [
          f.aembed(
      "📕 | Информация", 
      (
        '**Infinity Protect** - бот, который защищает сервер от вредоносных ботов и пользователей, которые хотят разрушить ваш сервер. Бот реагирует на множетсво событий, которые происходят на сервере, включая: удаление/создание ролей/каналов, бан/кик пользоваталей, изменение прав и переимонованее каналов, изменение прав у ролей, а также создание вебхуков (список будет пополнятся).\n\n'+
        
        'Язык программирования: `JS`\n'+
        'Библиотека: `Discord.JS V13`\n'+
        'Версия бота: `1.2`\nРазработчик: `ProBAN#1559`\nВладелец: [CryoDry](https://discord.gg/wQQB4Rm9Q4)\n\n' + 'Сервер поддержки: [тык](https://discord.gg/85gX9dVS4y)'
      ), f.colors.default)]})
	},
};
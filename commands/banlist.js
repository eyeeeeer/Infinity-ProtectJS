const banCollection = require('../banModel.js')
const paginationEmbed = require('discordjs-button-pagination');
const { MessageEmbed , MessageButton} = require('discord.js');
const { Permissions } = require('discord.js');
module.exports = {
  name: 'banlist',
  description: 'Список забаненых',
  default_permission: true,
	permissions: [],

async execute(client, interaction, f) {
  const author = interaction.guild.members.cache.find(mem => mem.user.id === interaction.user.id)
  if (!author.permissions.has(Permissions.FLAGS.ADMINISTRATOR) && !interaction.guild.ownerId == author.id){
	return interaction.reply({embeds: [f.aembed('ошибка', 'Для использования данной команды необходимы права администратора' , f.colors.default)]});
}
  var banList = await banCollection.find({
    guildId: interaction.guild.id
  })
  pages = [];
  const button1 = new MessageButton()
    .setCustomId('previousbtn')
    .setLabel('Назад')
    .setStyle('DANGER');

  const button2 = new MessageButton()
    .setCustomId('nextbtn')
    .setLabel('Вперед')
    .setStyle('SUCCESS');

  buttonList = [
    button1,
    button2
  ]
  for (var b of banList) {
    var size = pages.length + 1
    let target = await client.users.fetch(b['memberId'])
    let author = await client.users.fetch(b['author'])
    let banDuration = b['banDuration']
    let reason = b['reason']
    const embed1 = new MessageEmbed()
      .setTitle(`Запись ${size}`)
      .setDescription(`Пользователь: **${target.tag}/${target.id}**\nПричина: **${reason}**\nМодератор: **${author.tag}/${author.id}**\nБан действует до: <t:${banDuration}:f>`);
    pages.push(embed1)
  }
  if (pages.length == 0) {
    return interaction.reply({embeds: [f.aembed('Список временных банов', 'Пусто' , f.colors.default)]})
  }
    
  paginationEmbed(interaction, pages, buttonList);


// Create an array of embeds

  
}

}
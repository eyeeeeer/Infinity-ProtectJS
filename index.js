const { MessageEmbed, Client, Collection, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_WEBHOOKS]
});

const fs = require('node:fs')
const mongoose = require('mongoose')
var configs = require('./serverModel.js')
mongoose.connect('mongodb+srv://admin:analforzel@cluster0.klsbg.mongodb.net/InfinityProtect?retryWrites=true&w=majority');


const yaml = require('js-yaml');


const discordModals = require('discord-modals');


client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const data = []

for (const file of commandFiles) {
    const commandfile = require(`./commands/${file}`);
  
    client.commands.set(commandfile.name, commandfile);
    data.push({
        name: commandfile.name,
        description: commandfile.description,
        options: commandfile.options,
        default_permission: commandfile.default_permission,
        permissions: commandfile.permissions
    });
}


const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
client.on('guildCreate', async (guild) => {
  try {
    await client.application.commands.set(data);
  } catch {
    console.log('err create a slash commands')
  }
  var guildData = new configs({ _id: guild.id, antiNuke: true, channelDelete: {count: 4, mode: true}, channelCreate: {count: 10, mode: true}, channelUpdate: {count: 5, mode: true}, roleCreate: {count: 10, mode: true}, roleDelete: {count: 4, mode: true}, roleUpdate: {count: 3, mode: true}, webhookCreate: {count: 2, mode: true}, membersBan: {count: 3, mode: true}, membersKick: {count: 3, mode: true}, blockNewAccounts: false, blockNewAccountsTime: "3d", wl: []});
      guildData.save(function (err, data) {
       if (err) return  console.error(err);
       });
  
       var cnl = client.channels.cache.get('964508338530447430')
       
       const gdEmbed = new MessageEmbed()
       u = await client.users.fetch(guild.ownerId)
       .setTitle('Новый сервер')
       .setDescription(`**${guild.name}**\nВладелец: **${u.tag}/${u.id}**\nУчастников: **${guild.memberCount}**\nID: **${guild.id}**`)
       .setColor('#5865F2')
       cnl.send({embeds: [gdEmbed]})
       



})
client.on("debug", ( e ) => console.log(e))
client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
            if (!interaction.client.commands.has(interaction.commandName)) return;
            
            try {
                await interaction.client.commands.get(interaction.commandName).execute(interaction.client, interaction, {
                  aembed: aembed,
                  colors: {
                    default: "#5865F2",
                    error: "RED"
                  }
                });
            } catch (error) {
                console.error(error);

                return interaction.reply({
                    content: 'Произошла неизвестная ошибка при выполнении команды'
                });
}
    
      
    };
})

let aembed = (rustitle, rusdesc, color) => {
  let rusik = rustitle.toLowerCase()
  if(rusik == "ошибка") rustitle = ":x: | Ошибка"
  if(rusik == "успешно") rustitle = ":white_check_mark: | Успешно"

  const Embed = new MessageEmbed()
  .setTitle(rustitle)
  .setDescription(rusdesc).setColor(color).setFooter({text: "Infinity Protect"}).setTimestamp()

  return Embed
}

client.on("ready", async () => {
  client.user.setPresence({
        status: 'idle',
        activities: [{ name: 'https://infinityprotect.ml', type: 'PLAYING' }]
    });
  console.log('Начинаю процесс обновления команд...');
    //await configs.deleteMany({})
    await client.application.commands.set(data);
    const aGuilds = client.guilds.cache.map(guild => guild.id);
    for (var g of aGuilds) {
      //console.log(g)/
      var guildData = new configs({ _id: g, antiNuke: true, channelDelete: {count: 4, mode: true}, channelCreate: {count: 10, mode: true}, channelUpdate: {count: 5, mode: true}, roleCreate: {count: 10, mode: true}, roleDelete: {count: 4, mode: true}, roleUpdate: {count: 3, mode: true}, webhookCreate: {count: 2, mode: true}, membersBan: {count: 3, mode: true}, membersKick: {count: 3, mode: true}, blockNewAccounts: false, blockNewAccountsTime: "3d", wl: []});
      guildData.save(function (err, data) {
       if (err)  console.error('err');
       });

    }

});



console.log('Бот запускается...')
client.login('OTY0NTA0NzQxMjIyNjc4NTc5.Gr9ajb.Ij0EjTZR1yX5gyKJPwjoF1fTl_sb4QDYX55E8g')
console.log('какого хрена') //rate limits //а ошибка где //nety // за два часа должно было пофиксится //такое уже было, ждём

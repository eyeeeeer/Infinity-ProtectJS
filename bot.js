const { MessageEmbed, Client, Collection, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES]
});


const fs = require('node:fs')
const mongoose = require('mongoose')
var configs = require('./serverModel.js')
const banCollection = require('./banModel.js')
mongoose.connect('')




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
  var guildData = new configs({ _id: guild.id, antiNuke: true, channelDelete: {count: 4, mode: true}, channelCreate: {count: 10, mode: true}, channelUpdate: {count: 5, mode: true}, roleCreate: {count: 10, mode: true}, roleDelete: {count: 4, mode: true}, roleUpdate: {count: 3, mode: true}, webhookCreate: {count: 2, mode: true}, membersBan: {count: 3, mode: true}, membersKick: {count: 3, mode: true}, blockNewAccounts: false, blockNewAccountsTime: "3d", mode: false, wl: []});
      guildData.save(function (err, data) {
       if (err) return  console.error(err);
       });
  
       var cnl = client.channels.cache.get('964508338530447430')
       u = await client.users.fetch(guild.ownerId)
       const gdEmbed = new MessageEmbed()
       .setTitle('Новый сервер')
       .setDescription(`**${guild.name}**\nВладелец: **${u.tag}/${u.id}**\nУчастников: **${guild.memberCount}**\nID: **${guild.id}**`)
       .setColor('#5865F2')
       cnl.send({embeds: [gdEmbed]})
       



})




client.on('guildMemberAdd', async (member) => {
  const guildData = await configs.findById(member.guild.id)
  var mode = guildData['mode']
  if (mode == true) {
    const gdEmbed = new MessageEmbed()
    .setTitle('Сервер закрыт!')
    .setDescription(`Администрация сервера **${member.guild.name}** временно ограничила доступ к серверу. Повторите попытку позже.`)
    .setColor('#5865F2')
    await member.send({embeds: [gdEmbed]}).catch(e => console.log(e))
    await member.kick('Сервер закрыт').catch(e => console.log(e))
  }
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
  .setDescription(rusdesc).setColor(color).setFooter({text: "https://cyberazov.org"}).setTimestamp()

  return Embed
}

client.on("ready", async () => {
  client.user.setPresence({
        status: 'idle',
        activities: [{ name: 'https://cyberazov.org', type: 'PLAYING' }]
    });
  console.log('Начинаю процесс обновления команд...');
    await client.application.commands.set(data);
    const aGuilds = client.guilds.cache.map(guild => guild.id);
    for (var g of aGuilds) {
      //console.log(g)/
      var guildData = new configs({ _id: g, antiNuke: true, channelDelete: {count: 4, mode: true}, channelCreate: {count: 10, mode: true}, channelUpdate: {count: 5, mode: true}, roleCreate: {count: 10, mode: true}, roleDelete: {count: 4, mode: true}, roleUpdate: {count: 3, mode: true}, webhookCreate: {count: 2, mode: true}, membersBan: {count: 3, mode: true}, membersKick: {count: 3, mode: true}, blockNewAccounts: false, blockNewAccountsTime: "3d", mode: false, wl: []});
      guildData.save(function (err, data) {
       if (err)  console.error('err');
       });

    }

});

async function bansTimer() {
  var bansData = await banCollection.find()
  var now = Math.floor(Date.now() / 1000)
  for (var ban of bansData) {
    if (now >= parseInt(ban['banDuration'])) {
      var guild = client.guilds.cache.find(guild => guild.id == ban['guildId'])
      if (guild) {
      guild.members.unban(ban['memberId']).catch(e => console.log(e))
    }
      await banCollection.deleteOne({
        memberId: ban['memberId'],
        guildId: ban['guildId']
      })
    }
    var guild = client.guilds.cache.find(guild => guild.id == ban['guildId'])
    
    try {
    bnd = guild.bans.fetch().catch(e => console.log(e))
    if (bnd) {
    banned = guild.bans.fetch(ban['memberId']).catch(async (e) => {
      await banCollection.deleteOne({
        memberId: ban['memberId'],
        guildId: ban['guildId']
      })
    })
    }
   } catch(e) {
       console.log(e)
}
  }
}
var unban = setInterval(bansTimer, 60000)



client.login(process.env.token)

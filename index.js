const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./bot.js', { 
  token: "OTY0NTA0NzQxMjIyNjc4NTc5.G_ro9W.TgdDHPRJxQQvV7A0UlZCXXNs-a2QfekeibB700",
  totalShards: "auto"
});

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();

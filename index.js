const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./bot.js', { 
  token: "OTY0NTA0NzQxMjIyNjc4NTc5.GnldBP.YAeEZYJpnjHghkD2298_qDmvAhihQbbQVvMywo",
  totalShards: "auto"
});

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();

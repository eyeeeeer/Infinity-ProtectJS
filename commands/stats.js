module.exports = {
	name: 'stats',
	description: 'Статистика',
	default_permission: true,
	permissions: [],
	async execute(client, interaction, f) {
    return interaction.reply({embeds: [f.aembed("Статистика", `Серверов: **${client.guilds.cache.size}**`, f.colors.default)]})
	},
};
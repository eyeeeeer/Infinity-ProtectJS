module.exports = {
	name: 'ping',
	description: 'Задержка Discord API',
	default_permission: true,
	permissions: [],
	async execute(client, interaction, f) {
    return interaction.reply({embeds: [f.aembed("🏓 | Понг!", 'Задержка: ' + client.ws.ping + ' ms', f.colors.default)]})
	},
};
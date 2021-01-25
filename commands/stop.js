module.exports = {
	name: 'stop',
	description: 'остановка всей музыки',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voice.channel) return message.channel.send('нет музыки для остановки');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();
	},
};
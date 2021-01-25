module.exports = {
	name: 'skip',
	description: 'пропуск музыки',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voice.channel) return message.channel.send('зайди в голосовой канал что бы пропустить');
		if (!serverQueue) return message.channel.send('нет музыки для пропуска');
		serverQueue.connection.dispatcher.end();
	},
};
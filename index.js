const fs = require('fs')
const Discord = require('discord.js');
const Client = require('./client/Client');
const RPC = require('discord-rpc');
const {
	prefix,
	token,
	clientID
} = require('./config.json');

const rpc = new RPC.Client({
	transport:'ipc'
});
const client = new Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

console.log(client.commands);

client.once('ready', () => {
	console.log('Ready!');
	client.user.setStatus("dnd");
	client.user.setActivity(" твоей жопе", {type:"PLAYING"});
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
	
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

rpc.on("ready",()=>{
	rpc.setActivity({
		details:"str1",
		state:"str2",
		startTimestamp: new Date(),
		largeImageKey:"31",
		largeImageText:"text",
		smallImageKey:"test",
		smallImageText:"test1"

	});
	console.log("rpc")
});
rpc.login({
	clientId:"702070386325717045"
});
client.on('message', async message => {
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName);

	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	try {
		if(commandName == "ban" || commandName == "userinfo") {
			command.execute(message, client);
		} else {
			command.execute(message);
		}
	} catch (error) {
		console.error(error);
		message.reply('ошибка при выполнении команды');
	}
});
// function createWindow(){
// 	win = new BrowserWindows({
// 		width: 700,
// 		height: 500,
// 		icon _dirname +
// 	})


client.login(token);

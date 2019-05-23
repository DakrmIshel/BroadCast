const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Your Bot Is Online ${client.user.tag}!`);
});


client.on('message', message => { // هاذا للبرودكسات
        var prefix = '!'; // هنا تقدر تغير البرفكس
	var command = message.content.split(" ")[0];
	if(command == prefix + 'bc') { // الكوماند !bc
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don`t have **MANAGE_MESSAGES** permission!");
		var args = message.content.split(' ').slice(1).join(' ');
		if(message.author.bot) return;
		if(!args) return message.channel.send(`**➥ Useage:** ${prefix}bc كلامك`);
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don`t have **MANAGE_MESSAGES** permission!");
		
		let bcSure = new Discord.RichEmbed()
		.setTitle(`:mailbox_with_mail: **Are you Sure want Send This message to User** ${message.guild.memberCount} **User**`)
		.setThumbnail(client.user.avatarURL)
		.setColor('RANDOM')
		.setDescription(`**\n:envelope: ➥ Sending**\n\n${args}`)
		.setTimestamp()
		.setFooter(message.author.tag, message.author.avatarURL)
		
		message.channel.send(bcSure).then(msg => {
			msg.react('✅').then(() => msg.react('❎'));
			message.delete();
			
			
			let yesEmoji = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
			let noEmoji = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
			
			let sendBC = msg.createReactionCollector(yesEmoji);
			let dontSendBC = msg.createReactionCollector(noEmoji);
			
			sendBC.on('collect', r => {
				        message.guild.members.forEach(m => {
   if(!message.member.hasPermission('ADMINISTRATOR')) return;
            var bc = new Discord.RichEmbed()
            .addField('» السيرفر :', `${message.guild.name}`)
            .addField('» المرسل : ', `${message.author.username}#${message.author.discriminator}`)
            .addField(' » الرسالة : ', args)
            .setColor('#000000')
            // m.send(`[${m}]`);
            m.send(`${m}`,{embed: bc});
        });
				message.channel.send(`:timer: *We Sending u Message to Users*NTgwOTI5MzY2OTE4NDMwNzIw.XOX3VA.O2kardS8iZuVpWBp_xX-2QiA6Sk** \`\`${message.guild.memberCount}\`\` **User**`).then(msg => msg.delete(5000));
				msg.delete();
			})
			dontSendBC.on('collect', r => {
				msg.delete();
				message.reply(':white_check_mark: **DarkMishel>> Done We Cancel The Message**').then(msg => msg.delete(5000));
			});
		})
	}
});




client.login(process.env.BOT_TOKEN);

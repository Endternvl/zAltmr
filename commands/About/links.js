const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'links',
  aliases: ['supportlinks'],
  description: 'send a support links!',

  run: async(client,message,args) => {
    const a = new MessageEmbed()
    .setTitle('👋 Hello!')
    .setDescription('Thank you for checking my links! here is all of my support links! make sure you joined our support server if you want to ask about the repository or something \:>')
    .addField('Github Repository', '[`Click me for beta`](https://github.com/Endternvl/zAltmr-Beta)\n[`Click me for alpha`](https://github.com/Endternvl/zAltmr-Alpha)')
    .addField('Support Server', '[`Click Me`](https://discord.gg/9R7hZtbnyw)')
    .addField('Vote Me', '[`starbots`](https://starbots.ml/bot/842036225530396672/vote)\n[`discord4bots`](https://discord4bots.tk/bot/842036225530396672/vote)')
    .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
    .setColor('RED')
    .setFooter('zAltmr Links');
    return message.channel.send(a)
  }
}
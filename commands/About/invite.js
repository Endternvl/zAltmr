const { MessageEmbed } = require('discord.js')
const discord = require('discord.js')
const { version } = require('../../package.json');
const clientID = '842036225530396672';

module.exports = {
  name: 'invite',
  description: 'Invite Me To Your Server And Shine Your Server!',

  run: async (client, message, args) => {
    const embed = new MessageEmbed()
    .setTitle('Hello!')
    .setDescription(`Thank you for trying to invite me to a server!\n\n**Click One Of The Links Down Below!**\nServer Moderator: **[\`Click Me\`](https://discord.com/oauth2/authorize?client_id=${clientID}&scope=bot&permissions=2147483647)**
    Server Helper: **[\`Click Me\`](https://discord.com/oauth2/authorize?client_id=${clientID}&scope=bot&permissions=4294967287)** \n Recommended: **[\`Click Me\`](https://discord.com/oauth2/authorize?client_id=${clientID}&scope=bot&permissions=8589934591)**`)
    .setFooter(`© zAltmr v${version}`)
    .setColor("YELLOW");

    return message.channel.send(
      embed
    )
  }
}
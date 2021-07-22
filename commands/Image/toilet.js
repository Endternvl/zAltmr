const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
  name: 'toilet',
  description: 'Toilet Image',
  usage: '[USER]',
  category: 'Image',
  run: async (client, message, args) => {
    const member = message.mentions.members.first() || message.member;
    const canvas = Canvas.createCanvas(500, 670);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/779441456464003122/812706484240121876/unknown.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 135, 350, 205, 205);
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `toilet_${member.user.username}.jpg`);
    message.channel.send(attachment);
  }
}
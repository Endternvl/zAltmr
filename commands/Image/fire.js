const { MessageAttachment } = require('discord.js')
const Canvas = require('canvas')
module.exports = {
    name: 'fire',
    description: 'Puts fire on a user!',
    usage: 'fire [user]',
    category: 'Image',
    run: async (client, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        const canvas = Canvas.createCanvas(680, 794)
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        const pfp = await Canvas.loadImage(user.user.displayAvatarURL({ format: 'png', dynamic: true }))
        ctx.drawImage(pfp, 172, 0, 322, 322)
        const drip = await Canvas.loadImage('https://cdn.discordapp.com/attachments/820351709757833247/821817533471522876/output-onlinepngtools_3.png')
        ctx.drawImage(drip, 0, 0, canvas.width, canvas.height)
        const attachment = new MessageAttachment(canvas.toBuffer(), 'drip.png')
        let m = await message.channel.send("**Please wait...**")
  m.delete({ timeout : 495});
        message.channel.send(attachment)
    }
}
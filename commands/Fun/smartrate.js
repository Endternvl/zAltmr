const Discord = require("discord.js")


module.exports = {
  name: 'smartrate',
  description: 'Sends you your smart rate',
  usage: 'smartrate [user]',
  category: 'fun',
  guildOnly: true,
  run: async (client, message, args) => {



    let target = message.mentions.members.first()
    let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
      || message.member; let gayrate = Math.floor(Math.random() * 101)



    const gayrateEmbed = new Discord.MessageEmbed()
      .setTitle("Smartrate Machine")
      .setColor("RANDOM")
      .setDescription("You are `" + gayrate + "%` smart!")
      .setFooter(message.client.user.username, message.client.user.avatarURL())

    const argsEmbed = new Discord.MessageEmbed()
      .setTitle("Smartrate Machine")
      .setColor("RANDOM")
      .setDescription(`${target} is \`${gayrate}%\` smart!`)
      .setFooter(message.client.user.username, message.client.user.avatarURL())
    let usera = args[0]

    if (!usera) return message.channel.send(gayrateEmbed)

    let cmdresponce = args.slice(1).join(" ")

    if (!cmdresponce) return message.channel.send(argsEmbed)
  }
}

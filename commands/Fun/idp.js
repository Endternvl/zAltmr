const discord = require("discord.js");

module.exports = {
  name: "idp",
  category:"fun",
  run: async (client, message, args) => {
    
    if(!args[0]) {
      return message.channel.send("Please give Room ID!")
    }
    
    let pass = args.slice(1).join(" ")
    
    if(!pass) {
      return message.channel.send("Please give the Room Password!");
    }

  let embed = new discord.MessageEmbed()
  .addField("Room ID", "`" + args[0] + "`")
  .addField("Password", "`" + pass + "`")
  .setColor("YELLOW")
  message.channel.send(embed)

  message.delete()
    
  }
}
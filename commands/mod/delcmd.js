const db = require("quick.db")
const discord = require("discord.js")

module.exports = {
  name: "delcmd",
  usage: "delcmd <cmd_name>",
  description: "Delete the custom commannd",
  category: "moderation",
  run: (client, message, args) => {

    let cmdname = args[0]

    if(!cmdname) return message.channel.send(":x: Gimm me commmand name, `delcmd <cmd_name>`")

    let database = db.get(`cmd_${message.guild.id}`)

    if(database) {
      let data = database.find(x => x.name === cmdname.toLowerCase())

      if(!data) return message.channel.send(":x: Unable to find this command.")

      let value = database.indexOf(data)
      delete database[value]

      var filter = database.filter(x => {
        return x != null && x != ''
      })

      const delembed = new discord.MessageEmbed()
    .setTitle("Command Deleted!")
    .setDescription(`Removed **${cmdname}** Command From ${message.guild.name}!`)
    .setColor("GREEN")
    .setDescription(`Removed **${cmdname}** Command From ${message.guild.name}`)

      db.set(`cmd_${message.guild.id}`, filter)
      return message.channel.send(`Removed **${cmdname}** Command From ${message.guild.name}`)


    } else {
      return message.channel.send(":x: Sorry but i am unable to find that command! make sure it's not typo or make sure it's a **CUSTOM COMMAND**")
    


  }
  }
}
 
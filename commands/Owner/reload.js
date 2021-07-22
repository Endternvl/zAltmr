const djs = require('discord.js')

module.exports = {
  name: 'reload',
  description: 'Reloades a command',
  category: 'owner',
  usage: 'reload <category> <command>',
  run: async(client, message, args) => {
    //--------Check Permission--------\\
    if(message.author.id !== "787842689969684480") return message.channel.send("This command is only for <@787842689969684480>");
    
    if(!args[0]) return message.channel.send('You must provide a category name');
    if(!args[1]) return message.channel.send('You must provide a command for me to reload');

    let category = args[0].toLowerCase();
    let commandName = args[1].toLowerCase();

  try { 
     delete require.cache[require.resolve(`../../commands/${category}/${commandName}.js`)];
     client.commands.delete(commandName);
     const pull = require(`../../commands/${category}/${commandName}.js`);
     client.commands.set(commandName, pull);
    
    const embed = new djs.MessageEmbed()
 .setTitle('Reload Command')
 .setColor('YELLOW')
 .setDescription(`Successfully reloaded \`${args[1].toUpperCase()}\` command`)
 
   return message.channel.send(embed);
    } catch(e) {
        return message.channel.send(`Error while reloading: \`${args[1].toUpperCase()}\` command`);
    }
    
  }
  
}
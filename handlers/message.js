const client = require('../index');
const prefix = client.prefix;
const { Collection } = require('discord.js');
const Timeout = new Collection();
const ms = require('ms');
const premiumSchema = require('../mongodels/premium');
const sendError = require('../mores/error');

client.on('message', async (message) => {
  if(message.author.bot) return;
  if(message.content.toLowercase().startsWith(prefix)) return;
  if(message.guild) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();  
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if(!command) command = client.commands.get(client.aliases.get(cmd))
  if(command){
    if(command.premium && !(await premiumSchema.findOne({ User: message.author.id }))){
      return sendError('You can\'t access this commmand because this is a premium only command!', message.channel)
    }
    if(command.cooldown){
      if(Timeout.has(`${command.name}${message.author.id}`)) return sendError(`You need to wait \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\``, message.channel)
    }
  }
})
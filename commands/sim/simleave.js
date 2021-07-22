const sendr = require('../../mores/error');
const sendd = require('../../mores/success');

module.exports = {
  name: 'simleave',
  description: 'send a simulation of leave image.',
  botPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
  authorPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],

  run: async (client, message, args) => {
    const add = await client.emit("guildMemberRemove", message.member);
    if(!add) {
      return sendr('Please set-up a leave channel!', message.channel)
    }
    if(add) {
      return sendd('Executed Successfully. Check on channel! *note*\nIf it does not appears it means leave channel are not setted yet.', message.channel)
    }
  
  }
}
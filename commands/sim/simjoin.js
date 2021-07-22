const sendr = require('../../mores/error');
const sendd = require('../../mores/success');

module.exports = {
  name: 'simjoin',
  description: 'send a simulation of join image.',
  botPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
  authorPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],

  run: async (client, message, args) => {
    const add = await client.emit("guildMemberAdd", message.member);
    if (!add) {
      return sendr('Please setup a welcome channel!', message.channel)
    }
if(add) {
      return sendd('Executed Successfully. Check on channel! *note*\nIf it does not appears it means welcome channel are not setted yet.', message.channel)
    }
  }
}
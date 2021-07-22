const { MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'captcha',
    category: 'fun',
    description: 'captcha profile picture',
    usage: 'captcha/captcha <ping>',
    run: async (client, message, args) => { /// if dont work change it with ur handler
        let user = message.mentions.users.first() || message.author;
        let avatar = user.avatarURL({
          format: 'png',
          dynamic: false,
          size: 1024
        })

        message.channel.send('Loading... This May Take A Few Times...')
        try {
          const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=captcha&url=${avatar}&username=${user.tag}`));
          const vid = (await res.json()).message;

          const attachment = new MessageAttachment(vid, "captcha.png");
          message.channel.send(attachment);
        } catch (err) {
          console.log(err)
        }
  }
}
const { MessageAttachment } = require('discord.js'),
 fetch = require('node-fetch')

module.exports = {
  name: "stickbug",
  description: "easter egg",
  category: "fun",
  run: async (client, message, args) => {
      let user = message.mentions.users.first() || message.author;
        let avatar = user.avatarURL({
            format: 'png',
            dynamic: false,
            size: 1024
        })

        message.channel.send('<a:Loading:847370706048385034> Loading Things... This May Take A Few Seconds... Please Be Patient...')
                        try {
                    const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=stickbug&url=${avatar}`));
                    const vid = (await res.json()).message;

                    const attachment = new MessageAttachment(vid, `${user.tag}-stickbug.mp4`);
                    message.channel.send(attachment);
      } catch (err) {
                    console.log(err)
    }
  }
}
            
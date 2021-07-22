const client = require('../index');
  client.on("message", async message => {
    if (message.author.bot || !message.guild || message.webhookID) return;
    let Prefix = client.prefix;
    let translate = require("@iamtraction/google-translate");
    let language = await client.chatbots.get(`LANG_${message.guild.id}`);
    const cchann = await client.chatbots.get(`chatbot_${message.guild.id}`);
    if (cchann === null) return;
    if (!cchann) return;
    const sender = client.channels.cache.get(cchann);
    if (message.channel.name == sender.name) {
      if (message.author.bot) return;
      message.content = message.content
        .replace(/@(everyone)/gi, "everyone")
        .replace(/@(here)/gi, "here");
      message.channel.stopTyping();
      message.channel.startTyping();
      let data = await fetch(
        `https://api.affiliateplus.xyz/api/chatbot?message=${message.content}&botname=${client.user.username}&ownername=Skaryey`
      ).then(res => res.json());

      const translated = await translate(data.message, {
        to: language || "english"
      });

      message.reply(translated.text).catch();
      message.channel.stopTyping();
    }
  });
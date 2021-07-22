const fetch = require("node-fetch");

module.exports = {
  name: "dogfact",
  description: "Returns a dog fact",
  category: "animal",
  run: async (client, message) => {
    const fact = await fetch("http://dog-api.kinduff.com/api/facts?number=1")
      .then((res) => res.json())
      .then((body) => body.facts[0]);
    return message.channel.send(`📢 **Dogfact:** *${fact}*`);
  },
};
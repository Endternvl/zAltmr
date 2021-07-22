const random = require("easyfunjs").Img

module.exports = {
  name: "joke",
  category: "fun",
  description: "Get some fun jokes",
  run: async (client, message, args) => {
    
    let data = await random.getJoke()
    message.channel.send(data)
    
  }
}
const random = require("easyfunjs").Img


module.exports = {
  name: "neko",
  category: "fun",
  description: "Get some neko images",
  run: async (client, message, args) => {
    
    let data = await random.getNeko()
    message.channel.send(data)
    
  }
}
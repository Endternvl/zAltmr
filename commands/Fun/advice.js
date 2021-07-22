const { Img } = require("easyfunjs")

module.exports = {
  name: "advice",
  category: "fun",
  description: "Get some advice",
  run: async (client, message, args) => {
    let data = await Img.getAdvice()
    message.channel.send(data)
    
  }
}
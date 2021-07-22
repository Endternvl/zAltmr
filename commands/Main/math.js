module.exports = {
  name: "math",
  category: "main",
  aliases: ["calculate", "calculator"],
  description: "Math Command/Calculator Command With Discord Buttons!",

  run: async (client, message) => {
    const { easycalculator } = require('easyfunjs')
    await easycalculator(message)
  },
};
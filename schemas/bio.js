const { Schema, model } = require("mongoose");
const schema = new Schema({
	User: String,
	Bio: String,
})
module.exports = model("bio", schema);
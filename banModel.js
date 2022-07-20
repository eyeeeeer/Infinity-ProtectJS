const mongoose = require('mongoose')
const con = mongoose.connect('mongodb+srv://admin:BdJBm8ZBY7uneonw@cluster0.klsbg.mongodb.net/InfinityProtect?retryWrites=true&w=majority')

module.exports.db = con

var banSchema = new mongoose.Schema({
  guildId: String,
  memberId: String,
  banDuration: String,
  reason: String,
  author: String
});




module.exports = mongoose.model("ban", banSchema);

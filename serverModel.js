const mongoose = require('mongoose')
require('mongoose-long')(mongoose);
const {Types: {Long}} = mongoose

//let con = mongoose.connect('mongodb+srv://admin:analforzel@cluster0.klsbg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

//module.exports.db = con 

var guildSchema = new mongoose.Schema({
    _id: String,
    antiNuke: Boolean,
    channelDelete: {count: Number, mode: Boolean},
    channelCreate: {count: Number, mode: Boolean},
    channelUpdate: {count: Number, mode: Boolean},    
    roleDelete: {count: Number, mode: Boolean},
    roleCreate: {count: Number, mode: Boolean},
    roleUpdate: {count: Number, mode: Boolean},
    webhookCreate: {count: Number, mode: Boolean},
    membersBan: {count: Number, mode: Boolean}, 
    membersKick: {count: Number, mode: Boolean},
    blockNewAccounts: Boolean,
    blockNewAccountsTime: String,
    wl: [ String ],
    
});


module.exports = mongoose.model("configs", guildSchema);
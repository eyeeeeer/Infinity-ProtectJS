const mongoose = require('mongoose')
const con = mongoose.connect('mongodb+srv://admin:analforzel@cluster0.klsbg.mongodb.net/InfinityProtect?retryWrites=true&w=majority')
//let con = mongoose.connect('mongodb+srv://admin:analforzel@cluster0.klsbg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
module.exports.db = con 

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
    mode: Boolean,
    wl: [ String ],
    
});




module.exports = mongoose.model("configs", guildSchema);

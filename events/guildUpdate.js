const mongoose = require('mongoose')
var configs = require('../serverModel.js')
mongoose.connect('mongodb+srv://admin:analforzel@cluster0.klsbg.mongodb.net/InfinityProtect?retryWrites=true&w=majority')
module.exports = {
    name: 'guildUpdate',
    once: false,
    async execute(oldGuild, newGuild) {
    
    }
}
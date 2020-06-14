'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = Schema({
    name: String,
    surname: String,
    phones: String,
    email: String,
    address: String,
    relationship: String,
    note: String,
    custom_field: String,
    image: String
});

module.exports = mongoose.model('Contact', ContactSchema);
//mongoose lo pluraliza

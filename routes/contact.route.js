'use strict'

var express = require('express');
var ContactController =  require('../controllers/contact.controller');

var api = express.Router();


var multipart =  require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads'})

api.get('/contacts', ContactController.getContacts);
api.post('/contact', ContactController.saveContact);
api.put('/contact/:id', ContactController.updateContact);
api.delete('/contact/:id', ContactController.deleteContact);
api.get('/contact/:id', ContactController.getContact);
api.get('/contact/:id', ContactController.getContact);
api.post('/contact/:id/upload-image', md_upload, ContactController.uploadImage);
api.get('/imagen/:imageFile', ContactController.getImage);

module.exports = api;
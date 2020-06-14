'use strict'

// modulos
var fs = require('fs');
var path = require('path'); 

//modelos
var Contact = require('../models/contact.model');

//servicios

// acciones
function getContacts(req, res) {

    Contact.find({}).exec( (error, contacts) => {
        if(error) {
            res.status(500).send({message: 'Error en la peticion'});
        } else {
            if (!contacts) {
                res.status(200).send({message: 'No hay contactos'});
            } else {
                res.status(200).send({ 
                    contacts
                });
            }
        }
    });
}

function getContact(req, res) {
    var contactId = req.params.id;
    Contact.findById( contactId ).exec((err, contact) => {
        if(err) {
            res.status(500).send({message: 'Error en la peticion'});
        } else {
            if (!contact) {
                res.status(404).send({message: 'El contact no existe'});
            } else {
                res.status(200).send({ contact });
            }
        }
    });
}

function saveContact(req, res) {
    var contact = new Contact();
    var params = req.body;

    if(params.name && params.phones) {

        contact.name = params.name;
        contact.surname = params.surname;
        contact.phones = params.phones;
        contact.email = params.email;
        contact.address = params.address;
        contact.relationship = params.relationship;
        contact.note = params.note;
        contact.custom_field = params.custom_field;
        contact.image = null;

        contact.save((err, contactStored) => {
            if(err) {
                res.status(500).send({message: 'Error en el servidor'});
            } else {
                if(!contactStored) {
                    res.status(404).send({message: 'No se ha registrado el contact'});
                } else {
                    res.status(200).send({contact: contactStored}); 
                }
            }
        });
    }else {
        res.status(200).send({message: 'El nombre y el telefono son obligatorios'});
    }   
}

function updateContact(req, res){
    var contactId = req.params.id;
    var update = req.body;

    Contact.findByIdAndUpdate(contactId , update, {new: true}, (err, contactUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar contact' });
        } else {
            if(!contactUpdate) {
                res.status(404).send({ message: 'No se a podido actualizar el contact' });
            } else {
                res.status(200).send({ contact: contactUpdate });
            }
        }
    });
}

function deleteContact(req, res) {
    var contactId = req.params.id;

    Contact.findByIdAndRemove(contactId, (err, contactRemoved) => {
        if(err){
            res.status(500).send({ message: 'Error en la peticion'});
        }else {
            if(!contactRemoved) {
                res.status(404).send({ message: 'No se ha podido borrar el contacto, posiblemente no existe el contacto'});
            }else{
                res.status(200).send({ contactRemoved });
            }
        }
    });
}

function uploadImage(req, res) {

    var contactId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        file_name = file_split[1];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg') {

            Contact.findByIdAndUpdate(contactId, {image: file_name}, {new: true},  (err, contactUpdated) => {
                if (err) {
                    res.status(500).send({message: 'Error al actualizar el contact'});
                } else {

                    if (!contactUpdated) {
                        res.status(404).send({ message: 'No se a podido actualizar el contact'});
                    }else {
                        res.status(200).send({ contact: contactUpdated, image: file_name});
                    }
                }
            });

        } else {
            fs.unlink(file_path, (err) => {
                if (err) {
                    res.status(200).send({ message: 'Extension no valida y fichero no borrado'});
                } else {
                    res.status(200).send({ message: 'Extension no valida'});
                }
            });
            
        }

    } else {
        res.status(200).send({ message: 'No se ha subido el archivo'});
    }

}


function getImage(req, res) {

    var imageFile = req.params.imageFile;

    if(imageFile != '350'){
        var path_file = './uploads/'+ imageFile;

        fs.exists(path_file, (exists)=> {
            if(exists) {
                res.sendFile(path.resolve(path_file));
            } else {
                res.status(404).send({ message: 'la imagen no existe'});
            }
        });
    } else {
        var path_file = './assets/350x350.png';

        fs.exists(path_file, (exists)=> {
            if(exists) {
                res.sendFile(path.resolve(path_file));
            } else {
    
                res.status(404).send({ message: 'la imagen no existe'});
            }
        });
    }
}

module.exports = {
    getContacts,
    getContact,
    saveContact,
    updateContact,
    deleteContact,
    uploadImage,
    getImage
};

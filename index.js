'use strict'
var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;
mongoose.Promise = global.Promise;

//mongodb://localhost:27017/phonebook
mongoose.connect(
  'mongodb+srv://new_user:NkJeOvQ22SVr8Kgr@phonebook-vsk6q.mongodb.net/<phonebook>?retryWrites=true&w=majority', 
  { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false }
)
.then(
  () => {
      console.log('la conexion a la base de datos phonebook se ha realizado correctamente')
  
      app.listen(port, () => {
          console.log("El servidor local con Node y Express esta corriendo correctamente");
      });
  }
)
.catch(err => console.log(err));

//----------------------------------------------------------------------------------------------------------------------
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://root:<password>@phonebook-vsk6q.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
//----------------------------------------------------------------------------------------------------------------------


// var mongoose = require('mongoose');
// var app = require('./app');
// var port = process.env.PORT || 3001 ;
// const uri = "mongodb+srv://root:phonebook123@phonebook-vsk6q.mongodb.net/phonebook?retryWrites=true&w=majority";


// mongoose.connect(
//   uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// }).then(
//   ()=> {
//   console.log(`connection to database established`);
//   app.listen(port, () => {
//     console.log("El servidor local con Node y Express esta corriendo correctamente");
//   });

// }).catch(err => console.log(err));

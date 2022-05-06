//  SCRIPT DEFINIÇÃO DB

const mongoose = require('mongoose');

//  DEFINIE CONEXÃO  COM BANCO DE DADOS
mongoose
  .connect('mongodb+srv://hefi1413:teste123@cluster0.lkete.mongodb.net/elgeladon')
  //.connect(process.env.DATABASE_URL)
  .then(() => console.log('MongoDB Atlas Conectado!'))
  .catch((error) => console.log(`Erro ao conectar com o MongoDB, erro: ${error}`));
mongoose.Promisse = global.Promisse;

module.exports = mongoose;

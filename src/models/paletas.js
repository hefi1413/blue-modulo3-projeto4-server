const mongoose = require('./database/db.js');

//
//  DEFINIE MODELO PALETAS
//
const paletas = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  sabor: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
  recheio: {
    type: String,
    required: false,
  },
  possuirecheio: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Paletas = mongoose.model('Paleta', paletas, 'paletas');

module.exports = Paletas;

//  SCRIPT CONTROLLER

const Paletas = require('../models/paletas.js');

var message = '';
var type = '';

var paletasController = {
  // retorna todas paletas cadastradas
  // --------------------------
  findAll: async function (req, res, next) {
    console.log(req.method + ' ' + req.url);

    try {
      let paletas = await Paletas.find({});
      //let paletas = Paletas.get();

      setTimeout(() => {
        message = '';
      }, 5000);

      //res.send({ paletas: _paletas, message: message });
      res.status(200).send(paletas);
    } catch (err) {
      console.log(`Erro! ${err}`);
      res.status(500).send({ message: 'Não foi possível exibir os dados.' });
    }
  },

  // retorna paleta por id
  // --------------------------
  find: async function (req, res, next) {
    console.log(req.method + ' ' + req.url);

    let paletaId = req.params.id;
    try {
      // localiza paleta no BD
      let paleta = await Paletas.findOne({ _id: paletaId }).exec();
      //let paleta = findPaleta(paletaId);

      if (!paleta) {
        message = `Erro! Não foi possível localizar a paleta.`;
        res.status(400).send({ message: message });
        return;
      }

      setTimeout(() => {
        message = '';
      }, 5000);

      //res.send({ paletas: [paleta], message: message });
      message = 'Paleta localizada com sucesso!';
      res.status(200).send(paleta);
    } catch (err) {
      console.log('Erro ! ' + err.message);
      //res.status(500).send({ message: message, err: true });
      res.status(500).send({ message: message });
    }
  },

  // cria/cadastra uma paleta
  create: async function (req, res, next) {
    console.log(req.method + ' ' + req.url);

    let paleta = req.body;

    // trata campos
    if (!paleta.preco) {
      paleta.preco = 0;
    }

    if (!paleta.descricao) {
      paleta.descricao = `Sorvete sabor de ${paleta.sabor}`;
    }

    message = `Não foi possível adicionar a paleta!`;
    try {
      // adiciona paleta
      Paletas.create(paleta)
        .then(() => {
          message = 'Parabéns! Paleta criada com sucesso.';
          //res.send({ message: message, err: false });
          res.status(201).send(paleta);
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (err) {
      console.log('Erro ! ' + err.message);
      res.status(500).send({ message: message });
    }
  },

  // altera uma paleta
  update: async function (req, res, next) {
    console.log(req.method + ' ' + req.url);

    //console.log('req.body',  req.body );

    const paletaId = req.params.id;
    let _paleta = req.body;
    try {
      // localiza paleta no BD
      let paleta = await Paletas.findOne({ _id: paletaId }).exec();
      if (!paleta) {
        message = `A paleta ${_paleta.sabor} não foi localizada !`;
        //res.status(400).send({ message: message, err: true });
        res.status(400).send(paleta);
        return;
      }

      // peleta localizada
      paleta.titulo = _paleta.titulo;
      paleta.sabor = _paleta.sabor;
      paleta.descricao = _paleta.descricao;
      paleta.foto = _paleta.foto;
      paleta.recheio = _paleta.recheio;
      paleta.preco = _paleta.preco;

      message = `Não foi possível alterar paleta.`;

      paleta
        .save()
        .then((result) => {
          message = `Paleta alterada com sucesso!`;
          //res.status(200).send({ message: message, err: false });
          res.status(200).send({ message: message });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (err) {
      console.log('Erro ! ' + err.message);
      //res.send({ message: message, err: true });
      res.status(500).send({ message: message });
    }
  },

  // deleta uma paleta
  delete: async function (req, res, next) {
    console.log(req.method + ' ' + req.url);

    let paletaId = req.params.id;
    try {
      // localiza paleta no BD
      let paleta = await Paletas.findOne({ _id: paletaId }).exec();
      if (!paleta) {
        message = `A paleta id:${paletaId} não foi localizada !`;
        res.status(400).send({ message: message });
        return;
      }

      let count = await paleta.deleteOne({ _id: paleta._id });
      if (count.countDocuments == 0) {
        message = `Não foi possível deletar a paleta.`;
        throw new Error(err.message);
      }
      message = `Paleta deleteda com sucesso !`;
      res.status(200).send({ message: message });
    } catch (err) {
      console.log('Erro ! ' + err.message);
      res.status(500).send({ message: message });
    }
  },
};

module.exports = paletasController;

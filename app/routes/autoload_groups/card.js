const router = require('express').Router();
const Card = require('mongoose').model('Card');

router.param('id', function(req, res, next) {
  const id = req.params.id;
  Card.findOneById(id, function(err, card) {
    if (err) {
      return res.status(500).json({
        statusCode: 500,
        message: 'the server has error'
      });
    }

    if (!card) {
      return res.status(404).json({
        statusCode: 404,
        message: 'not found'
      });
    }

    req.card = card;
    next();
  });

});

router.route('/')
  .get(function(req, res) {

    Card.find(function(err, card) {
      if (err) {
        return res.status(500).json({
          statusCode: 500,
          message: 'the server has error'
        });
      }

      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        card: card
      });
    });

  })
  .post(function(req, res) {
    Card.createWithName(req.body.name, function(err) {
      if (err) {
        return res.status(500).json({
          statusCode: 500,
          message: 'the server has error'
        });
      }
      res.status(200).json({
        statusCode: 200,
        message: 'success'
      });
    });
  });

router.route('/:id')
  .get(function(req, res) {
    res.status(200).json({
      statusCode: 200,
      message: 'success',
      card: req.card
    });
  })
  .put(function(req, res) {
    Card.updateWithNameById(req.params.id, req.body.name, function(err) {
      if (err) {
        return res.status(500).json({
          statusCode: 500,
          message: 'the server has error'
        });
      }
      res.status(200).json({
        statusCode: 200,
        message: 'success'
      });
    });
  })
  .delete(function(req, res) {
    Card.removeById(req.params.id, function(err) {
      if (err) {
        return res.status(500).json({
          statusCode: 500,
          message: 'the server has error'
        });
      }
      res.status(200).json({
        statusCode: 200,
        message: 'success'
      });
    });
  });


module.exports = router;

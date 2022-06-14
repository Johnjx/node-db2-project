const router = require('express').Router();
const carModel = require('./cars-model');
const carMW = require('./cars-middleware');

router.get('/', (req, res, next) => {
    carModel.getAll()
    .then(cars => res.json(cars))
    .catch(next)
})

module.exports = router;

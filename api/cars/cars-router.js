const router = require("express").Router();
const carModel = require("./cars-model");
const carMW = require("./cars-middleware");

router.get("/", (req, res, next) => {
    carModel.getAll()
    .then((cars) => res.json(cars))
    .catch(next);
});

router.get('/:id', carMW.checkCarId, (req, res, next) => {
    res.json(req.car);
})

router.post(
    '/',
    carMW.checkVinNumberValid,
    carMW.checkVinNumberUnique,
    carMW.checkCarPayload,
    (req, res, next) => {
        res.send('vin valid')
})

module.exports = router;

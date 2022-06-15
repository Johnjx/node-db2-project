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
    carMW.checkCarPayload,
    carMW.checkVinNumberValid,
    carMW.checkVinNumberUnique,
    (req, res, next) => {
        carModel.create(req.body)
        .then(newCar => res.status(201).json(newCar))
        .catch(next)
})

module.exports = router;

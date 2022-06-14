const carModel = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = (req, res, next) => {
 carModel.getById(req.params.id)
 .then(car => {
  if (car == null) {
    next({
      status: 404,
      message: `car with id ${req.params.id} is not found`
    })
    return;
  }
  req.car = car;
  next();
 })
 .catch(next)
}

const checkCarPayload = (req, res, next) => {
 let { vin, make, model, mileage, title, transmission } = req.body;


}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;
  const isValidVin = vinValidator.validate(vin);
  if (!isValidVin) {
    next({
      status: 400,
      message: `vin ${vin} is invalid`
    })
    return;
  }
  next();
}

const checkVinNumberUnique = (req, res, next) => {
  carModel.getByVin(req.body.vin)
  .then(vinResult => {
    if (vinResult) {
      next({
        status: 400,
        message: `vin ${req.body.vin} already exists`
      })
      return
    }
    next();
  })
  .catch(next)
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
const carModel = require('./cars-model');
const vinValidator = require('vin-validator');

const createErr = (field) => {
  const errObj = {
    status: 400,
    message: `${field} is missing`
  }
  return errObj;
 } 

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
 let { vin, make, model, mileage } = req.body;
 
 if (!vin) {
  next(createErr('vin'))
  return;
 }
 if (!make || make.trim().length < 1) {
  next(createErr('make'))
  return;
 }
 if (!model || model.trim().length < 1) {
  next(createErr('model'))
  return;
 }
 if (typeof mileage !== 'number' || isNaN(mileage) || mileage < 0) {
  next(createErr('mileage'))
  return;
 }
 next();
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
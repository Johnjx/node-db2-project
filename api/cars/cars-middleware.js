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
 let { vin, make, model, mileage, title, transmission } = req.body;
 
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
 if (title) {
  if (title !== 'salvage' && title !== 'clean') {
    next(createErr('title'))
    return;
  }
  make = make.trim();
  model = model.trim();
  title = title.trim();
  req.body = { vin, make, model, mileage, title };
  next();
  return;
 }
 if (transmission) {
  if (transmission !== 'manual' && transmission !== 'automatic') {
    next(createErr('transmission'))
    return;
  }
  make = make.trim();
  model = model.trim();
  title = title.trim();
  transmission = transmission.trim();
  req.body = { vin, make, model, mileage, title, transmission };
  next();
  return;
 }

 make = make.trim();
 model = model.trim();
 req.body = { vin, make, model, mileage };
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
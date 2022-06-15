const db = require('../../data/db-config');
const cars = 'cars';

const getAll = () => {
  return db(cars);
}

const getById = (id) => {
  return db(cars)
  .where({ id })
  .first()
}

const getByVin = vin => {
  return db(cars)
  .where('vin', vin)
  .first()
}

const create = async (car) => {
  const [id] = await db(cars).insert(car);
  return getById(id);
}

module.exports = {
  getAll,
  getById,
  getByVin,
  create
}
const db = require('../../data/db-config');
const cars = 'cars';

const getAll = () => {
  return db(cars);
}

const getById = () => {
  // DO YOUR MAGIC
}

const create = () => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create
}
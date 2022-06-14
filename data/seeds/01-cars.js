// STRETCH
const cars = [
  {
    vin: "YS3ED48E5Y3070016",
    make: "Tesla",
    model: "Model S",
    mileage: 10000,
    title: "clean",
    transmission: "manual",
  },
  {
    vin: "1D4GP24333B230914",
    make: "Tesla",
    model: "Model X",
    mileage: 120456,
    title: "salvage",
    transmission: "automatic",
  },
  {
    vin: "2C4GP44362R700796",
    make: "Tesla",
    model: "Model Y",
    mileage: 82681,
  },
];

exports.seed = async (knex) => {
    await knex('cars').truncate();
    await knex('cars').insert(cars)
}
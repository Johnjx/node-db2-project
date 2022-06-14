// STRETCH
const cars = [
  {
    vin: "74740917470474874",
    make: "Tesla",
    model: "Model S",
    mileage: 10000,
    title: "clean",
    transmission: "manual",
  },
  {
    vin: "17305775957848433",
    make: "Tesla",
    model: "Model X",
    mileage: 120456,
    title: "salvage",
    transmission: "automatic",
  },
  {
    vin: "38504740576695431",
    make: "Tesla",
    model: "Model Y",
    mileage: 82681,
  },
];

exports.seed = async (knex) => {
    await knex('cars').truncate();
    await knex('cars').insert(cars)
}
/* eslint-disable prettier/prettier */
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

//Read file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//Import data to DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

//Delete all dat from collection

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// if (process.agrv[2] === '--import') {
//   importData();
//   console.log(process.argv[2]);
// } else if (process.agrv[2] === '--delete') {
//   deleteData();
//   console.log(process.argv[2]);
// }
// console.log(process.argv[2]);

// deleteData()
// importData();

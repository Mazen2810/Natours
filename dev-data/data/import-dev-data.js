const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/toursModel');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewModel');

dotenv.config({ path: './config.env' });

const database = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Tours imported:', tours.length);

    await User.create(users, { validateBeforeSave: false });
    console.log('Users imported:', users.length);

    await Review.create(reviews);
    console.log('Reviews imported:', reviews.length);

    console.log('Data Imported Successfully');
  } catch (err) {
    console.error('Import failed at:', err.name, '-', err.message);
    console.error(err);
  } finally {
    // give the driver time to flush pending writes before killing the process
    setTimeout(() => process.exit(), 1000);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data Deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
mongoose
  .connect(database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB connection successful');
    if (process.argv[2] === '--import') importData();
    if (process.argv[2] === '--delete') deleteData();
  })
  .catch(err => console.error('DB connection error:', err));

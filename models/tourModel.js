/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name!'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A tour name mast have less or equal then 40 characters!',
      ],
      minlength: [
        40,
        'A tour name mast have more or equal then 10 characters!',
      ],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration!'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size!'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a group size!'],
      enum: ['easy', 'medium', 'difficult'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'A rating must be above 1.0!'],
      max: [5, 'A rating must be below 5.0!'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price!'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price!',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description!'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image!'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//virtual properties
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//!Document middleware -runs before .save() and .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { loser: true });
  next();
});

// //!Query Middleware
// tourSchema.pre('find', function (doc, next) {
//   next();
// });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

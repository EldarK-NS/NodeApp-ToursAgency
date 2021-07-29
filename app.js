/* eslint-disable prettier/prettier */
const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//!Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   req.requesTime = new Date().toISOString();
//   console.log(req.headers);
//   next();
// });

//!ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//!!Middleware for all incorrect routes, ( в этом случае ОЧЕНЬ!!! ВАЖЕН порядок расположения кода так как если этот блок будет выше оастальных путей то он заблокирует весь поток)
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

//! global error
app.use(globalErrorHandler);

module.exports = app;

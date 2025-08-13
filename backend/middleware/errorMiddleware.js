/* Centralized error handler */
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Server Error';
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }
  res.status(statusCode).json({ message });
};
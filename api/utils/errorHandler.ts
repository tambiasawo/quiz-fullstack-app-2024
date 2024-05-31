function errorHandler(err, req, res, next) {
  console.error("Error:", err);

  // Determine appropriate status code based on error type
  let statusCode = 500; // Default to Internal Server Error
  if (err.status) {
    statusCode = err.status;
  }

  // Return error response with appropriate status code and message
  res
    .status(statusCode)
    .json({ message: err.message || "Internal Server Error" });
}

export default errorHandler;

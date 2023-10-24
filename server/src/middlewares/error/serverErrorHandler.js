const serverErrorHandler = (err, req, res) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default serverErrorHandler;
